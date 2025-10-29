import { Router } from "express";
import {
  listarRanking,
  rankingPorCategoria,
  vistaDetalladaRestaurante,
} from "../controllers/ranking.controller.js";

const router = Router();

// 📊 Ranking general
router.get("/ranking", listarRanking);

// 📂 Ranking por categoría
router.get("/categoria/:categoria", rankingPorCategoria);

// 🔍 Vista detallada
router.get("/detalle/:id", vistaDetalladaRestaurante);

export default router;
