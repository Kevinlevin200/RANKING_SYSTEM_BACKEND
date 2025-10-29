import {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
} from "../services/categorias.service.js";

export async function registrarCategoria(req, res) {
  try {
    const { nombre } = req.body;
    const resultado = await crearCategoria(nombre);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("❌ Error en registrarCategoria:", error.message);
    res.status(400).json({ error: error.message });
  }
}

export async function listarCategorias(req, res) {
  try {
    const categorias = await obtenerCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    console.error("❌ Error en listarCategorias:", error.message);
    res.status(500).json({ error: "Error al obtener categorías." });
  }
}

export async function modificarCategoria(req, res) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const resultado = await actualizarCategoria(id, nombre);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en modificarCategoria:", error.message);
    res.status(400).json({ error: error.message });
  }
}

export async function borrarCategoria(req, res) {
  try {
    const { id } = req.params;
    const resultado = await eliminarCategoria(id);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en borrarCategoria:", error.message);
    res.status(404).json({ error: error.message });
  }
}