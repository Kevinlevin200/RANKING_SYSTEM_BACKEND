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
    .custom((value) => {
      // Permitir null, undefined o cadena vacía
      if (value === null || value === undefined || value === '') {
        return true;
      }
      // Si tiene valor, debe ser string
      if (typeof value === 'string') {
        return true;
      }
      throw new Error('La imagen debe ser una cadena (URL) o estar vacía.');
    }),

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
    .custom((value) => {
      // Permitir null, undefined o cadena vacía
      if (value === null || value === undefined || value === '') {
        return true;
      }
      // Si tiene valor, debe ser string
      if (typeof value === 'string') {
        return true;
      }
      throw new Error('La imagen debe ser una cadena (URL) o estar vacía.');
    }),

  body("restauranteId")
    .optional()
    .isString()
    .withMessage("El ID del restaurante debe ser una cadena válida."),
];