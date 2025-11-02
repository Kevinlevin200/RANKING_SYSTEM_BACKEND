import { GetDB } from "../config/db.js";

const COLECCION_PLATOS = "platos";

export async function registrarPlato(datos) {
  const { nombre, descripcion, categoria, ubicacion, imagen, restauranteId } = datos;

  if (!nombre || !descripcion || !categoria || !ubicacion || !restauranteId) {
    throw new Error("Faltan campos obligatorios.");
  }

  const existe = await GetDB().collection(COLECCION_PLATOS).findOne({
    nombre,
    restauranteId,
  });
  if (existe) throw new Error("Ya existe un plato con ese nombre en este restaurante.");

  const nuevoPlato = {
    nombre,
    descripcion,
    categoria,
    ubicacion,
    imagen: imagen || null,
    restauranteId,
    creadoEn: new Date(),
  };

  await GetDB().collection(COLECCION_PLATOS).insertOne(nuevoPlato);
  return { message: "Plato registrado correctamente." };
}

export async function obtenerPlatosPorRestaurante(restauranteId) {
  const platos = await GetDB()
    .collection(COLECCION_PLATOS)
    .find({ restauranteId })
    .toArray();

  return platos;
}

export async function obtenerPlatoPorId(id) {
  const { ObjectId } = await import("mongodb");

  const plato = await GetDB()
    .collection(COLECCION_PLATOS)
    .findOne({ _id: new ObjectId(id) });

  if (!plato) throw new Error("Plato no encontrado.");
  return plato;
}

export async function actualizarPlato(id, datos) {
  const { ObjectId } = await import("mongodb");

  const actualizacion = {
    ...datos,
    actualizadoEn: new Date(),
  };

  const resultado = await GetDB()
    .collection(COLECCION_PLATOS)
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: actualizacion }
    );

  if (resultado.matchedCount === 0) throw new Error("Plato no encontrado.");
  return { message: "Plato actualizado correctamente." };
}

export async function eliminarPlato(id) {
  const { ObjectId } = await import("mongodb");

  const resultado = await GetDB()
    .collection(COLECCION_PLATOS)
    .deleteOne({ _id: new ObjectId(id) });

  if (resultado.deletedCount === 0) throw new Error("Plato no encontrado.");
  return { message: "Plato eliminado correctamente." };
}

export const obtenerTodosLosPlatosService = async () => {
  try {
    const db = GetDB();
    
    const platos = await db
      .collection("platos")
      .find({})
      .toArray();

    console.log(`✅ Service: ${platos.length} platos encontrados en BD`);

    return {
      success: true,
      data: platos,
      total: platos.length
    };
  } catch (error) {
    console.error("❌ Service Error al listar todos los platos:", error);
    throw new Error(`Error en servicio: ${error.message}`);
  }
};