// src/dto/usuarios.dto.js
import { body } from "express-validator";

// DTO para registrar usuario o admin
export const registrarUsuarioDTO = [
  body("email")
    .isEmail()
    .withMessage("Debe proporcionar un email válido.")
    .normalizeEmail(),

  body("usuario")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres."),

  body("contraseña")
    .isString()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres.")
    .matches(/[A-Za-z]/)
    .withMessage("La contraseña debe contener al menos una letra."),

  body("tipo")
    .isIn(["usuario", "admin"])
    .withMessage("El tipo debe ser 'usuario' o 'admin'."),
];

// DTO para login
export const loginUsuarioDTO = [
  body("email")
    .isEmail()
    .withMessage("Debe proporcionar un email válido.")
    .normalizeEmail(),

  body("contraseña")
    .isString()
    .notEmpty()
    .withMessage("Debe ingresar la contraseña."),
];

// DTO para cambiar contraseña
export const cambiarContraseñaDTO = [
  body("email")
    .isEmail()
    .withMessage("Debe proporcionar un email válido."),

  body("nuevaContraseña")
    .isString()
    .isLength({ min: 6 })
    .withMessage("La nueva contraseña debe tener al menos 6 caracteres.")
    .matches(/[A-Za-z]/)
    .withMessage("La nueva contraseña debe contener al menos una letra."),
];