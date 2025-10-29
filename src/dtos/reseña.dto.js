import { body } from "express-validator";

// DTO para registrar reseña
export const registrarReseñaDTO = [
  body("comentario")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El comentario es obligatorio.")
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres."),

  body("calificacion")
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificación debe ser un número entre 1 y 5."),

  body("restauranteId")
    .isString()
    .notEmpty()
    .withMessage("El ID del restaurante es obligatorio."),

  body("usuarioId")
    .isString()
    .notEmpty()
    .withMessage("El ID del usuario es obligatorio."),
];

// DTO para actualizar reseña
export const actualizarReseñaDTO = [
  body("comentario")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres."),

  body("calificacion")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificación debe ser un número entre 1 y 5."),
];
