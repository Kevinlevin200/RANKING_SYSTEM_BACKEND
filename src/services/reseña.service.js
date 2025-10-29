import { GetDB } from "../config/db.js";

const COLECCION_RESEÑAS = "reseñas";
const COLECCION_RESTAURANTES = "restaurantes";

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