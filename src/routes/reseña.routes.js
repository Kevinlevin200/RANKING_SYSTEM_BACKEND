import { Router } from "express";
import {
  crearReseña,
  modificarReseña,
  borrarReseña,
} from "../controllers/reseña.controller.js";
import {
  registrarReseñaDTO,
  actualizarReseñaDTO,
} from "../dtos/reseña.dto.js";
import { validationDTO } from "../middlewares/validation_dto.js";
import { verificarSesion } from "../middlewares/verificar_sesion.js";

const router = Router();

router.post(
  "/registrar",
  verificarSesion,
  registrarReseñaDTO,
  validationDTO,
  crearReseña
);

router.patch(
  "/:id",
  verificarSesion,
  actualizarReseñaDTO,
  validationDTO,
  modificarReseña
);

router.delete("/:id", verificarSesion, borrarReseña);

export default router;
