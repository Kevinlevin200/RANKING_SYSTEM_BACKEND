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
} from "../dtos/categorias.dto.js";
import { validationDTO } from "../middlewares/validation_dto.js";
import { verificarSesion } from "../middlewares/verificar_sesion.js";

const router = Router();

router.get("/", listarCategorias);

router.post(
  "/registrar",
  verificarSesion,
  crearCategoriaDTO,
  validationDTO,
  registrarCategoria
);

router.patch(
  "/:id",
  verificarSesion,
  actualizarCategoriaDTO,
  validationDTO,
  modificarCategoria
);

router.delete("/:id", verificarSesion, borrarCategoria);

export default router;