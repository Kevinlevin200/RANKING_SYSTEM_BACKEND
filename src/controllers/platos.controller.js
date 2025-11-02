import {
  registrarPlato,
  obtenerPlatosPorRestaurante,
  obtenerPlatoPorId,
  actualizarPlato,
  eliminarPlato,
  obtenerTodosLosPlatosService
} from "../services/platos.service.js";

export async function crearPlato(req, res) {
  try {
    const resultado = await registrarPlato(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("❌ Error en registrarPlato:", error.message);
    res.status(400).json({ error: error.message });
  }
}

export async function listarPlatosPorRestaurante(req, res) {
  try {
    const { restauranteId } = req.params;
    const platos = await obtenerPlatosPorRestaurante(restauranteId);
    res.status(200).json(platos);
  } catch (error) {
    console.error("❌ Error en listarPlatosPorRestaurante:", error.message);
    res.status(500).json({ error: "Error al obtener los platos." });
  }
}

export async function verPlatoPorId(req, res) {
  try {
    const { id } = req.params;
    const plato = await obtenerPlatoPorId(id);
    res.status(200).json(plato);
  } catch (error) {
    console.error("❌ Error en verPlatoPorId:", error.message);
    res.status(404).json({ error: error.message });
  }
}

export async function modificarPlato(req, res) {
  try {
    const { id } = req.params;
    const resultado = await actualizarPlato(id, req.body);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en modificarPlato:", error.message);
    res.status(400).json({ error: error.message });
  }
}

export async function borrarPlato(req, res) {
  try {
    const { id } = req.params;
    const resultado = await eliminarPlato(id);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en borrarPlato:", error.message);
    res.status(404).json({ error: error.message });
  }
}

export const listarTodosLosPlatos = async (req, res) => {
  try {
    console.log("🔍 Controller: Solicitando todos los platos...");
    
    const resultado = await obtenerTodosLosPlatosService();

    if (!resultado.success) {
      return res.status(500).json({ 
        error: "Error al obtener los platos",
        detalles: resultado.error 
      });
    }

    console.log(`✅ Controller: Enviando ${resultado.total} platos al cliente`);

    return res.status(200).json(resultado.data);
    
  } catch (error) {
    console.error("❌ Controller Error al listar todos los platos:", error);
    return res.status(500).json({ 
      error: "Error al obtener los platos",
      detalles: error.message 
    });
  }
};
