import { GetDB } from "../config/db.js";

const COLECCION_NOTIFICACIONES = "notificaciones"


export async function registrarNotificacion(datos) {
    const { resenaId, restauranteId, usuarioId, vista } = datos;

    if (!resenaId || !restauranteId || !usuarioId || !vista) {
        throw new Error("Faltan campos obligatorios.");
    }

    const nuevaNotificacion = {
        resenaId,
        restauranteId,
        usuarioId,
        vista,
        creadaEn: new Date(),
    };

    await GetDB().collection(COLECCION_NOTIFICACIONES).insertOne(nuevaNotificacion);

    return { message: "esta es una notificacion." };
}

export async function obtenerNotificacion(id) {
    const { ObjectId } = await import("mongodb");

    const notificacion = await GetDB()
        .collection(COLECCION_NOTIFICACIONES)
        .findOne({ _id: new ObjectId(id) });

    if (!notificacion) throw new Error("notificacion no encontrada.");
    return notificacion;
}

export async function actualizarNotificacion(id, datos) {
    const { ObjectId } = await import("mongodb");

    const actualizacion = {
        ...datos
    };

    const resultado = await GetDB()
        .collection(COLECCION_NOTIFICACIONES)
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: actualizacion }
        );

    if (resultado.matchedCount === 0) throw new Error("notificacion no encontrada.");
    return { message: "notificacion vista." };
}

export async function eliminarNotificacion(id) {
    const { ObjectId } = await import("mongodb");

    const resultado = await GetDB()
        .collection(COLECCION_NOTIFICACIONES)
        .deleteOne({ _id: new ObjectId(id) });

    if (resultado.deletedCount === 0) throw new Error("Notificacion no encontrada.");
    return { message: "Notificacion eliminada correctamente." };
}