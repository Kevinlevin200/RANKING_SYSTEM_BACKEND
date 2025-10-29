import { GetDB } from "../config/db.js";

// 📊 Listar restaurantes por ranking ponderado
export async function obtenerRankingRestaurantes() {
  const restaurantes = await GetDB().collection("restaurantes").find({ aprobado: true }).toArray();

  const reseñas = await GetDB().collection("reseñas").find().toArray();

  const ranking = restaurantes.map(rest => {
    const reseñasRest = reseñas.filter(r => r.restauranteId === rest._id.toString());

    const totalCalificacion = reseñasRest.reduce((sum, r) => sum + r.calificacion, 0);
    const totalLikes = reseñasRest.reduce((sum, r) => sum + (r.likes?.length || 0), 0);
    const totalDislikes = reseñasRest.reduce((sum, r) => sum + (r.dislikes?.length || 0), 0);
    const totalReseñas = reseñasRest.length;

    const score =
      totalReseñas === 0
        ? 0
        : (totalCalificacion / totalReseñas) +
          (totalLikes * 0.1) -
          (totalDislikes * 0.05);

    return {
      restaurante: rest,
      score: parseFloat(score.toFixed(2)),
    };
  });

  return ranking.sort((a, b) => b.score - a.score);
}

// 📂 Filtrar restaurantes por categoría
export async function filtrarRankingPorCategoria(categoria) {
  const todos = await obtenerRankingRestaurantes();
  return todos.filter(r => r.restaurante.categoria === categoria);
}

// 🔍 Vista detallada
export async function obtenerVistaDetallada(id) {
  const { ObjectId } = await import("mongodb");

  const restaurante = await GetDB()
    .collection("restaurantes")
    .findOne({ _id: new ObjectId(id), aprobado: true });

  if (!restaurante) throw new Error("Restaurante no encontrado.");

  const platos = await GetDB()
    .collection("platos")
    .find({ restauranteId: id })
    .toArray();

  const reseñas = await GetDB()
    .collection("reseñas")
    .find({ restauranteId: id })
    .toArray();

  return {
    restaurante,
    platos,
    reseñas,
  };
}
