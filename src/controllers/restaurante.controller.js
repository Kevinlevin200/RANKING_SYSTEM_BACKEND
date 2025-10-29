// src/controllers/restaurante.controller.js
import {
  crearRestaurante,
  obtenerRestaurantes,
  obtenerRestaurantePorId,
  actualizarRestaurante,
  eliminarRestaurante,
} from "../services/restaurantes.service.js";


export async function registrarRestaurante(req, res) {
  try {
    const resultado = await crearRestaurante(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("❌ Error en registrarRestaurante:", error.message);
    res.status(400).json({ error: error.message });
  }
}

export async function listarRestaurantes(req, res) {
  try {
    const restaurantes = await obtenerRestaurantes();
    res.status(200).json(restaurantes);
  } catch (error) {
    console.error("❌ Error en listarRestaurantes:", error.message);
    res.status(500).json({ error: "Error al obtener restaurantes." });
  }
}

export async function verRestaurantePorId(req, res) {
  try {
    const { id } = req.params;
    const restaurante = await obtenerRestaurantePorId(id);
    res.status(200).json(restaurante);
  } catch (error) {
    console.error("❌ Error en verRestaurantePorId:", error.message);
    res.status(404).json({ error: error.message });
  }
}

export async function modificarRestaurante(req, res) {
  try {
    const { id } = req.params;
    const resultado = await actualizarRestaurante(id, req.body);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en modificarRestaurante:", error.message);
    res.status(400).json({ error: error.message });
  }
}

export async function borrarRestaurante(req, res) {
  try {
    const { id } = req.params;
    const resultado = await eliminarRestaurante(id);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en borrarRestaurante:", error.message);
    res.status(404).json({ error: error.message });
  }
}