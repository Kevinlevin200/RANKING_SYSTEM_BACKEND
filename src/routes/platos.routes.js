import { Router } from "express";
import {
  registrarPlato,
  listarPlatosPorRestaurante,
  verPlatoPorId,
  modificarPlato,
  borrarPlato,
} from "../controllers/plato.controller.js";
import {
  registrarPlatoDTO,
  actualizarPlatoDTO,
} from "../dtos/plato.dto.js";
import { validationDTO } from "../middlewares/validation_dto.js";
import { verificarSesion } from "../middlewares/verificar_sesion.js";

const router = Router();

router.get("/restaurante/:restauranteId", listarPlatosPorRestaurante);

router.get("/:id", verPlatoPorId);

router.post(
  "/registrar",
  verificarSesion,
  registrarPlatoDTO,
  validationDTO,
  registrarPlato
);

router.patch(
  "/:id",
  verificarSesion,
  actualizarPlatoDTO,
  validationDTO,
  modificarPlato
);

router.delete("/:id", verificarSesion, borrarPlato);

export default router;
