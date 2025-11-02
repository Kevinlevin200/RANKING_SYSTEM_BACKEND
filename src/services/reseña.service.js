import { GetDB } from "../config/db.js";

const COLECCION_RESEÑAS = "reseñas";
const COLECCION_RESTAURANTES = "restaurantes";
const COLECCION_USUARIOS = "usuarios"; // 👈 NUEVO

export async function registrarReseña(datos) {
  const { comentario, calificacion, restauranteId, usuarioId } = datos;

  if (!comentario || !calificacion || !restauranteId || !usuarioId) {
    throw new Error("Faltan campos obligatorios.");
  }

  if (typeof calificacion !== "number" || calificacion < 1 || calificacion > 5) {
    throw new Error("La calificación debe estar entre 1 y 5 estrellas.");
  }

  const nuevaReseña = {
    comentario,
    calificacion,
    restauranteId,
    usuarioId,
    likes: [],
    dislikes: [],
    creadaEn: new Date(),
    actualizadaEn: null,
  };

  await GetDB().collection(COLECCION_RESEÑAS).insertOne(nuevaReseña);
  await recalcularRating(restauranteId);

  return { message: "Reseña registrada correctamente." };
}

export async function actualizarReseña(id, datos, usuarioId) {
  const { ObjectId } = await import("mongodb");

  const reseña = await GetDB()
    .collection(COLECCION_RESEÑAS)
    .findOne({ _id: new ObjectId(id) });

  if (!reseña) throw new Error("Reseña no encontrada.");
  if (reseña.usuarioId !== usuarioId) throw new Error("No puedes editar reseñas de otros usuarios.");

  const actualizacion = {
    ...datos,
    actualizadaEn: new Date(),
  };

  await GetDB().collection(COLECCION_RESEÑAS).updateOne(
    { _id: new ObjectId(id) },
    { $set: actualizacion }
  );

  await recalcularRating(reseña.restauranteId);
  return { message: "Reseña actualizada correctamente." };
}

export async function eliminarReseña(id, usuarioId) {
  const { ObjectId } = await import("mongodb");

  const reseña = await GetDB()
    .collection(COLECCION_RESEÑAS)
    .findOne({ _id: new ObjectId(id) });

  if (!reseña) throw new Error("Reseña no encontrada.");
  if (reseña.usuarioId !== usuarioId) throw new Error("No puedes eliminar reseñas de otros usuarios.");

  await GetDB().collection(COLECCION_RESEÑAS).deleteOne({ _id: new ObjectId(id) });
  await recalcularRating(reseña.restauranteId);

  return { message: "Reseña eliminada correctamente." };
}

// 👤 NUEVA FUNCIÓN: Obtener reseñas con datos de restaurante y usuario
export async function obtenerReseñasPorUsuario(usuarioId) {
  const { ObjectId } = await import("mongodb");

  // Obtener reseñas del usuario
  const reseñas = await GetDB()
    .collection(COLECCION_RESEÑAS)
    .find({ usuarioId })
    .sort({ creadaEn: -1 })
    .toArray();

  if (!reseñas || reseñas.length === 0) {
    return [];
  }

  // Obtener IDs únicos de restaurantes
  const restauranteIds = [...new Set(reseñas.map(r => r.restauranteId))];

  // Buscar restaurantes
  const restaurantes = await GetDB()
    .collection(COLECCION_RESTAURANTES)
    .find({ _id: { $in: restauranteIds.map(id => new ObjectId(id)) } })
    .toArray();

  // Mapear restaurantes por ID
  const restaurantesMap = {};
  restaurantes.forEach(rest => {
    restaurantesMap[rest._id.toString()] = rest;
  });

  // Combinar reseñas con datos de restaurante
  return reseñas.map(reseña => ({
    ...reseña,
    restauranteId: restaurantesMap[reseña.restauranteId] || null,
    createdAt: reseña.creadaEn,
  }));
}

async function recalcularRating(restauranteId) {
  const reseñas = await GetDB()
    .collection(COLECCION_RESEÑAS)
    .find({ restauranteId })
    .toArray();

  if (reseñas.length === 0) {
    await GetDB().collection(COLECCION_RESTAURANTES).updateOne(
      { _id: restauranteId },
      { $set: { rating: null } }
    );
    return;
  }

  const total = reseñas.reduce((sum, r) => sum + r.calificacion, 0);
  const promedio = parseFloat((total / reseñas.length).toFixed(2));

  await GetDB().collection(COLECCION_RESTAURANTES).updateOne(
    { _id: restauranteId },
    { $set: { rating: promedio } }
  );
}

// 👍 DAR LIKE A UNA RESEÑA
export async function darLikeReseña(reseñaId, usuarioId) {
  const { ObjectId } = await import("mongodb");

  const reseña = await GetDB()
    .collection(COLECCION_RESEÑAS)
    .findOne({ _id: new ObjectId(reseñaId) });

  if (!reseña) throw new Error("Reseña no encontrada.");

  // Verificar si el usuario ya dio like
  const yaLike = reseña.likes?.includes(usuarioId);
  
  if (yaLike) {
    // Si ya dio like, quitarlo (toggle)
    await GetDB().collection(COLECCION_RESEÑAS).updateOne(
      { _id: new ObjectId(reseñaId) },
      { $pull: { likes: usuarioId } }
    );
    return { message: "Like eliminado", likes: (reseña.likes?.length || 1) - 1 };
  }

  // Si tiene dislike, quitarlo primero
  const yaDislike = reseña.dislikes?.includes(usuarioId);
  if (yaDislike) {
    await GetDB().collection(COLECCION_RESEÑAS).updateOne(
      { _id: new ObjectId(reseñaId) },
      { $pull: { dislikes: usuarioId } }
    );
  }

  // Agregar like
  await GetDB().collection(COLECCION_RESEÑAS).updateOne(
    { _id: new ObjectId(reseñaId) },
    { $addToSet: { likes: usuarioId } }
  );

  return { 
    message: "Like agregado", 
    likes: (reseña.likes?.length || 0) + 1,
    dislikes: yaDislike ? (reseña.dislikes?.length || 1) - 1 : (reseña.dislikes?.length || 0)
  };
}

// 👎 DAR DISLIKE A UNA RESEÑA
export async function darDislikeReseña(reseñaId, usuarioId) {
  const { ObjectId } = await import("mongodb");

  const reseña = await GetDB()
    .collection(COLECCION_RESEÑAS)
    .findOne({ _id: new ObjectId(reseñaId) });

  if (!reseña) throw new Error("Reseña no encontrada.");

  // Verificar si el usuario ya dio dislike
  const yaDislike = reseña.dislikes?.includes(usuarioId);
  
  if (yaDislike) {
    // Si ya dio dislike, quitarlo (toggle)
    await GetDB().collection(COLECCION_RESEÑAS).updateOne(
      { _id: new ObjectId(reseñaId) },
      { $pull: { dislikes: usuarioId } }
    );
    return { message: "Dislike eliminado", dislikes: (reseña.dislikes?.length || 1) - 1 };
  }

  // Si tiene like, quitarlo primero
  const yaLike = reseña.likes?.includes(usuarioId);
  if (yaLike) {
    await GetDB().collection(COLECCION_RESEÑAS).updateOne(
      { _id: new ObjectId(reseñaId) },
      { $pull: { likes: usuarioId } }
    );
  }

  // Agregar dislike
  await GetDB().collection(COLECCION_RESEÑAS).updateOne(
    { _id: new ObjectId(reseñaId) },
    { $addToSet: { dislikes: usuarioId } }
  );

  return { 
    message: "Dislike agregado", 
    dislikes: (reseña.dislikes?.length || 0) + 1,
    likes: yaLike ? (reseña.likes?.length || 1) - 1 : (reseña.likes?.length || 0)
  };
}