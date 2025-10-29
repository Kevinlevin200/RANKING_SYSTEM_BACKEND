import {
  obtenerRankingRestaurantes,
  filtrarRankingPorCategoria,
  obtenerVistaDetallada,
} from "../services/ranking.service.js";

// 📊 Listar ranking
export async function listarRanking(req, res) {
  try {
    const resultado = await obtenerRankingRestaurantes();
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en listarRanking:", error.message);
    res.status(500).json({ error: "Error al obtener ranking." });
  }
}

// 📂 Filtrar por categoría
export async function rankingPorCategoria(req, res) {
  try {
    const { categoria } = req.params;
    const resultado = await filtrarRankingPorCategoria(categoria);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en rankingPorCategoria:", error.message);
    res.status(400).json({ error: error.message });
  }
}

// 🔍 Vista detallada
export async function vistaDetalladaRestaurante(req, res) {
  try {
    const { id } = req.params;
    const resultado = await obtenerVistaDetallada(id);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en vistaDetalladaRestaurante:", error.message);
    res.status(404).json({ error: error.message });
  }
}
