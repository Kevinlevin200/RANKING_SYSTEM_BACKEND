// src/routes/restaurantes.routes.js
import { Router } from "express";
import {
  registrarRestaurante,
  listarRestaurantes,
  verRestaurantePorId,
  modificarRestaurante,
  borrarRestaurante,
} from "../controllers/restaurante.controller.js";
import {
  registrarRestauranteDTO,
  actualizarRestauranteDTO,
} from "../dtos/restaurante.dto.js";
import { validationDTO } from "../middlewares/validation_dto.js";
import { verificarSesion, verificarSesionOpcional } from "../middlewares/verificar_sesion.js";

const router = Router();

// ✅ Esta ruta usa verificarSesionOpcional para identificar si es admin
router.get("/", verificarSesionOpcional, listarRestaurantes);

router.get("/:id", verRestaurantePorId);

router.post(
  "/registrar",
  verificarSesion,
  registrarRestauranteDTO,
  validationDTO,
  registrarRestaurante
);

router.patch(
  "/:id",
  verificarSesion,
  actualizarRestauranteDTO,
  validationDTO,
  modificarRestaurante
);

router.delete("/:id", verificarSesion, borrarRestaurante);

export default router;