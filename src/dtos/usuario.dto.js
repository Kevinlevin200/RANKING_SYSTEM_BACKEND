import { body } from "express-validator";

// DTO para registrar usuario o empleado
export const registrarUsuarioDTO = [
  body("email")
    .isEmail()
    .withMessage("Debe proporcionar un email válido."),

  body("usuario")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio."),

  body("contraseña")
    .isString()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),

  body("tipo")
    .isIn(["usuario", "empleado"])
    .withMessage("El tipo debe ser 'usuario' o 'empleado'."),
];

// DTO para login
export const loginUsuarioDTO = [
  body("email")
    .isEmail()
    .withMessage("Debe proporcionar un email válido."),

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
    .withMessage("La nueva contraseña debe tener al menos 6 caracteres."),
];