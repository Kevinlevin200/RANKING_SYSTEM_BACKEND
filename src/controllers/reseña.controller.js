import {
  registrarReseña,
  actualizarReseña,
  eliminarReseña,
} from "../services/reseña.service.js";

// 📝 Registrar reseña
export async function crearReseña(req, res) {
  try {
    const resultado = await registrarReseña(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("❌ Error en registrarReseña:", error.message);
    res.status(400).json({ error: error.message });
  }
}

// ✏️ Editar reseña
export async function modificarReseña(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = req.body.usuarioId;

    if (!usuarioId) {
      return res.status(400).json({ error: "El ID del usuario es obligatorio." });
    }

    const resultado = await actualizarReseña(id, req.body, usuarioId);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en modificarReseña:", error.message);
    res.status(400).json({ error: error.message });
  }
}

// 🗑️ Eliminar reseña
export async function borrarReseña(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = req.body.usuarioId;

    if (!usuarioId) {
      return res.status(400).json({ error: "El ID del usuario es obligatorio." });
    }

    const resultado = await eliminarReseña(id, usuarioId);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en borrarReseña:", error.message);
    res.status(404).json({ error: error.message });
  }
}
