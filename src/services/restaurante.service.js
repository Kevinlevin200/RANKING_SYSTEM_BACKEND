import { GetDB } from "../config/db.js";

const COLECCION_RESTAURANTES = "restaurantes";

export async function crearRestaurante(datos) {
  const { nombre, descripcion, categoria, ubicacion, imagen, aprobado } = datos;

  if (!nombre || !descripcion || !categoria || !ubicacion) {
    throw new Error("Faltan campos obligatorios.");
  }

  const existe = await GetDB().collection(COLECCION_RESTAURANTES).findOne({ nombre });
  if (existe) throw new Error("El nombre del restaurante ya está registrado.");

  const nuevoRestaurante = {
    nombre,
    descripcion,
    categoria,
    ubicacion,
    imagen: imagen || null,
    aprobado: aprobado === true,
    creadoEn: new Date(),
  };

  await GetDB().collection(COLECCION_RESTAURANTES).insertOne(nuevoRestaurante);
  return { message: "Restaurante registrado correctamente." };
}

// ✅ MODIFICADO: Ahora acepta un parámetro opcional para filtrar
export async function obtenerRestaurantes(filtros = {}) {
  // Si no se especifican filtros, devuelve TODOS los restaurantes
  // Esto permite que el admin vea todos, pero el público solo vea los aprobados
  const restaurantes = await GetDB()
    .collection(COLECCION_RESTAURANTES)
    .find(filtros)
    .toArray();

  return restaurantes;
}

export async function obtenerRestaurantePorId(id) {
  const { ObjectId } = await import("mongodb");
  const restaurante = await GetDB()
    .collection(COLECCION_RESTAURANTES)
    .findOne({ _id: new ObjectId(id) });

  if (!restaurante) throw new Error("Restaurante no encontrado.");
  return restaurante;
}

export async function actualizarRestaurante(id, datos) {
  const { ObjectId } = await import("mongodb");

  const actualizacion = {
    ...datos,
    actualizadoEn: new Date(),
  };

  const resultado = await GetDB()
    .collection(COLECCION_RESTAURANTES)
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: actualizacion }
    );

  if (resultado.matchedCount === 0) throw new Error("Restaurante no encontrado.");
  return { message: "Restaurante actualizado correctamente." };
}

export async function eliminarRestaurante(id) {
  const { ObjectId } = await import("mongodb");

  const resultado = await GetDB()
    .collection(COLECCION_RESTAURANTES)
    .deleteOne({ _id: new ObjectId(id) });

  if (resultado.deletedCount === 0) throw new Error("Restaurante no encontrado.");
  return { message: "Restaurante eliminado correctamente." };
}