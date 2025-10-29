import { Router } from "express";
import {
  registrarCategoria,
  listarCategorias,
  modificarCategoria,
  borrarCategoria,
} from "../controllers/categoria.controller.js";
import {
  crearCategoriaDTO,
  actualizarCategoriaDTO,
} from "../dtos/categoria.dto.js";
import { validationDTO } from "../middlewares/validation_dto.js";
import { verificarSesion } from "../middlewares/verificar_sesion.js";
import { soloAdmin } from "../middlewares/solo_admin.js";

const router = Router();

router.get("/", listarCategorias);

router.post(
  "/registrar",
  verificarSesion,
  soloAdmin,
  crearCategoriaDTO,
  validationDTO,
  registrarCategoria
);

router.patch(
  "/:id",
  verificarSesion,
  soloAdmin,
  actualizarCategoriaDTO,
  validationDTO,
  modificarCategoria
);

router.delete("/:id", verificarSesion, soloAdmin, borrarCategoria);

export default router;