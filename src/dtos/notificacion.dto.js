import { body } from "express-validator";

export const crearNotificacionDTO = [
    body("resenaId")
        .isString()
        .notEmpty()
        .withMessage("El ID de la resena es obligatoria."),
    body("restauranteId")
        .isString()
        .notEmpty()
        .withMessage("El ID del restaurante es obligatorio."),

    body("usuarioId")
        .isString()
        .notEmpty()
        .withMessage("El ID del usuario es obligatorio."),
    body("vista")
        .optional()
        .isBoolean()
        .withMessage("El campo 'aprobado' debe ser booleano."),
];

export const actualizarNotificacionDTO = [
    body("vista")
        .optional()
        .isBoolean()
        .withMessage("El campo 'aprobado' debe ser booleano."),
];