// src/routes/usuarios.routes.js
import { Router } from "express";
import {
  registrarUnUsuario,
  iniciarSesion,
  cerrarSesion,
  actualizarContraseña,
  verificarSesionActual
} from "../controllers/usuario.controller.js";
import {
  registrarUsuarioDTO,
  loginUsuarioDTO,
  cambiarContraseñaDTO
} from "../dto/usuarios.dto.js";
import { validationDTO } from "../middlewares/validation_dto.js";
import { verificarSesion } from "../middlewares/verificar_sesion.js";

const router = Router();

// 🔍 Verificar sesión activa (requiere token JWT)
router.get("/verificar-sesion", verificarSesion, verificarSesionActual);

// 🧍 Registrar usuario o admin
router.post("/registrar", registrarUsuarioDTO, validationDTO, registrarUnUsuario);

// 🔐 Iniciar sesión
router.post("/login", loginUsuarioDTO, validationDTO, iniciarSesion);

// 🚪 Cerrar sesión (solo borra token en el cliente)
router.post("/logout", cerrarSesion);

// 🔑 Cambiar contraseña (solo si el usuario está logueado)
router.patch(
  "/cambiar-contraseña",
  verificarSesion,
  cambiarContraseñaDTO,
  validationDTO,
  actualizarContraseña
);

export default router;
