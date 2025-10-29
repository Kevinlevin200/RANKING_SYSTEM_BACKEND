import { body } from "express-validator";

export const registrarRestauranteDTO = [
  body("nombre")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre del restaurante es obligatorio.")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres."),

  body("descripcion")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria.")
    .isLength({ min: 10, max: 300 })
    .withMessage("La descripción debe tener entre 10 y 300 caracteres."),

  body("categoria")
    .isIn(["Comida rápida", "Gourmet", "Vegetariano", "Internacional", "Tradicional"])
    .withMessage("La categoría debe ser válida."),

  body("ubicacion")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("La ubicación es obligatoria.")
    .isLength({ min: 5, max: 100 })
    .withMessage("La ubicación debe tener entre 5 y 100 caracteres."),

  body("imagen")
    .optional()
    .isString()
    .withMessage("La imagen debe ser una cadena (URL o base64)."),

  body("aprobado")
    .optional()
    .isBoolean()
    .withMessage("El campo 'aprobado' debe ser booleano."),
];

// DTO para actualizar restaurante
export const actualizarRestauranteDTO = [
  body("nombre")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres."),

  body("descripcion")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 10, max: 300 })
    .withMessage("La descripción debe tener entre 10 y 300 caracteres."),

  body("categoria")
    .optional()
    .isIn(["Comida rápida", "Gourmet", "Vegetariano", "Internacional", "Tradicional"])
    .withMessage("La categoría debe ser válida."),

  body("ubicacion")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("La ubicación debe tener entre 5 y 100 caracteres."),

  body("imagen")
    .optional()
    .isString()
    .withMessage("La imagen debe ser una cadena (URL o base64)."),

  body("aprobado")
    .optional()
    .isBoolean()
    .withMessage("El campo 'aprobado' debe ser booleano."),
];
