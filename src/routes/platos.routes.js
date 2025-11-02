import { Router } from "express";
import {
  crearPlato,
  listarPlatosPorRestaurante,
  verPlatoPorId,
  modificarPlato,
  borrarPlato,
  listarTodosLosPlatos
} from "../controllers/platos.controller.js";
import {
  registrarPlatoDTO,
  actualizarPlatoDTO,
} from "../dtos/platos.dto.js";
import { validationDTO } from "../middlewares/validation_dto.js";
import { verificarSesion } from "../middlewares/verificar_sesion.js";

const router = Router();

router.get("/", listarTodosLosPlatos);

router.get("/restaurante/:restauranteId", listarPlatosPorRestaurante);

router.get("/:id", verPlatoPorId);

router.post(
  "/registrar",
  verificarSesion,
  registrarPlatoDTO,
  validationDTO,
  crearPlato
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
