import {
    registrarNotificacion,
    obtenerNotificacion,
    actualizarNotificacion,
    eliminarNotificacion
} from "../services/notificaciones.service.js";


export async function nuevaNotificacion(req, res) {
    try {
        const resultado = await registrarNotificacion(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("❌ Error en la creacion de la notificacion:", error.message);
        res.status(400).json({ error: error.message });
    }
}

export async function verNotificacion(req, res) {
    try {
        const resultado = await obtenerNotificacion(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("❌ Error no existe la notificacion:", error.message);
        res.status(400).json({ error: error.message });
    }
}

export async function modificarNotificacion(req, res) {
    try {
        const resultado = await actualizarNotificacion(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("❌ Error no existe la notificacion:", error.message);
        res.status(400).json({ error: error.message });
    }
}

export async function borrarNotificacion(req, res) {
    try {
        const resultado = await eliminarNotificacion(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("❌ Error no existe la notificacion:", error.message);
        res.status(400).json({ error: error.message });
    }
}
