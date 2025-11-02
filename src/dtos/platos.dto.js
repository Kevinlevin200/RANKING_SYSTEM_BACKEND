import { body } from "express-validator";

// DTO para registrar plato
export const registrarPlatoDTO = [
  body("nombre")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre del plato es obligatorio.")
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

  body("imagen")
    .optional()
    .isString()
    .withMessage("La imagen debe ser una cadena (URL o base64)."),

  body("restauranteId")
    .isString()
    .notEmpty()
    .withMessage("El ID del restaurante es obligatorio."),
];

// DTO para actualizar plato
export const actualizarPlatoDTO = [
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

  body("imagen")
    .optional()
    .isString()
    .withMessage("La imagen debe ser una cadena (URL o base64)."),

  body("restauranteId")
    .optional()
    .isString()
    .withMessage("El ID del restaurante debe ser una cadena válida."),
];
