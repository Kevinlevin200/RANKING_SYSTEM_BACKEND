import { GetDB } from "../config/db.js";

const COLECCION_CATEGORIAS = "categorias";

// ➕ Crear categoría (solo admin)
export async function crearCategoria(nombre) {
  if (!nombre || typeof nombre !== "string") {
    throw new Error("El nombre de la categoría es obligatorio.");
  }

  const existe = await GetDB().collection(COLECCION_CATEGORIAS).findOne({ nombre });
  if (existe) throw new Error("La categoría ya existe.");

  await GetDB().collection(COLECCION_CATEGORIAS).insertOne({
    nombre,
    creadaEn: new Date(),
  });

  return { message: "Categoría creada correctamente." };
}

// 📋 Obtener todas las categorías
export async function obtenerCategorias() {
  return await GetDB().collection(COLECCION_CATEGORIAS).find().toArray();
}

// ✏️ Actualizar categoría (solo admin)
export async function actualizarCategoria(id, nuevoNombre) {
  const { ObjectId } = await import("mongodb");

  if (!nuevoNombre || typeof nuevoNombre !== "string") {
    throw new Error("El nuevo nombre es obligatorio.");
  }

  const existe = await GetDB().collection(COLECCION_CATEGORIAS).findOne({ nombre: nuevoNombre });
  if (existe) throw new Error("Ya existe una categoría con ese nombre.");

  const resultado = await GetDB().collection(COLECCION_CATEGORIAS).updateOne(
    { _id: new ObjectId(id) },
    { $set: { nombre: nuevoNombre, actualizadaEn: new Date() } }
  );

  if (resultado.matchedCount === 0) throw new Error("Categoría no encontrada.");
  return { message: "Categoría actualizada correctamente." };
}

// 🗑️ Eliminar categoría (solo admin)
export async function eliminarCategoria(id) {
  const { ObjectId } = await import("mongodb");

  const resultado = await GetDB().collection(COLECCION_CATEGORIAS).deleteOne({ _id: new ObjectId(id) });
  if (resultado.deletedCount === 0) throw new Error("Categoría no encontrada.");

  return { message: "Categoría eliminada correctamente." };
}
