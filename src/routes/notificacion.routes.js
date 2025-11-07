import { Router } from "express";
import { validationDTO } from "../middlewares/validation_dto.js";
import {
    nuevaNotificacion,
    verNotificacion,
    modificarNotificacion,
    borrarNotificacion
} from "../controllers/notificacion.controller.js";
import { crearNotificacionDTO, actualizarNotificacionDTO } from "../dtos/notificacion.dto.js";


const router = Router();

router.get("/:id", verNotificacion);

router.post("/", crearNotificacionDTO, validationDTO, nuevaNotificacion);

router.patch(
  "/:id",
  actualizarNotificacionDTO,
  validationDTO,
  modificarNotificacion
);

router.delete("/:id", borrarNotificacion);

export default router;
