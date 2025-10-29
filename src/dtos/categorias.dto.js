import { body } from "express-validator";

export const crearCategoriaDTO = [
  body("nombre")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre de la categoría es obligatorio.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Debe tener entre 3 y 50 caracteres."),
];

export const actualizarCategoriaDTO = [
  body("nombre")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nuevo nombre es obligatorio.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Debe tener entre 3 y 50 caracteres."),
];
