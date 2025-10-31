// src/controllers/usuarios.controller.js
import {
  registrarUsuario,
  validarCredenciales,
  cambiarContraseña,
} from "../services/usuarios.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// 🧍 Registrar usuario o admin
export async function registrarUnUsuario(req, res) {
  try {
    const resultado = await registrarUsuario(req.body);
    
    console.log("📦 Resultado del servicio registrarUsuario:", resultado);
    
    // ⭐ VERIFICAR QUE RESULTADO TENGA LA ESTRUCTURA CORRECTA
    // El servicio puede devolver: { usuario: {...} } o directamente el usuario
    const usuarioRegistrado = resultado.usuario || resultado;
    
    if (!usuarioRegistrado || !usuarioRegistrado._id) {
      throw new Error("Error: El servicio no devolvió un usuario válido");
    }
    
    // ⭐ GENERAR TOKEN JWT DESPUÉS DEL REGISTRO
    const payload = {
      id: usuarioRegistrado._id,
      email: usuarioRegistrado.email,
      tipo: usuarioRegistrado.tipo,
      usuario: usuarioRegistrado.usuario,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    // ⭐ DEVOLVER TOKEN Y DATOS DEL USUARIO
    res.status(201).json({
      mensaje: resultado.mensaje || "✅ Usuario registrado exitosamente",
      token,
      usuario: {
        _id: usuarioRegistrado._id,
        email: usuarioRegistrado.email,
        usuario: usuarioRegistrado.usuario,
        tipo: usuarioRegistrado.tipo,
      },
    });
  } catch (error) {
    console.error("❌ Error en registrarUnUsuario:", error);
    console.error("❌ Stack completo:", error.stack);
    res.status(400).json({ error: error.message });
  }
}

// 🔐 Iniciar sesión con JWT
export async function iniciarSesion(req, res) {
  try {
    const { email, contraseña } = req.body;
    if (!email || !contraseña)
      return res.status(400).json({ error: "Email y contraseña son requeridos" });

    const usuario = await validarCredenciales(email, contraseña);

    // Crear payload y firmar token
    const payload = {
      id: usuario._id,
      email: usuario.email,
      tipo: usuario.tipo, // "usuario" o "admin"
      usuario: usuario.usuario,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    res.status(200).json({
      mensaje: "✅ Sesión iniciada",
      token,
      usuario: {
        _id: usuario._id,
        email: usuario.email,
        usuario: usuario.usuario,
        tipo: usuario.tipo,
      },
    });
  } catch (error) {
    console.error("❌ Error en iniciarSesion:", error);
    if (error.message === "Usuario no encontrado.")
      return res.status(404).json({ error: error.message });
    if (error.message === "Contraseña incorrecta.")
      return res.status(401).json({ error: error.message });
    res.status(500).json({ error: "Error al iniciar sesión: " + error.message });
  }
}

// 🚪 Cerrar sesión (solo frontend borra el token)
export async function cerrarSesion(req, res) {
  try {
    res.status(200).json({ mensaje: "✅ Sesión cerrada (token invalidado en cliente)" });
  } catch (error) {
    console.error("❌ Error en cerrarSesion:", error);
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
}

// 🔑 Cambiar contraseña
export async function actualizarContraseña(req, res) {
  try {
    const { email, nuevaContraseña } = req.body;
    const resultado = await cambiarContraseña(email, nuevaContraseña);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en actualizarContraseña:", error);
    res.status(400).json({ error: error.message });
  }
}

// 🔍 Verificar sesión actual (token JWT)
export async function verificarSesionActual(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ error: "Token no proporcionado." });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({
      usuario: {
        _id: decoded.id,
        email: decoded.email,
        usuario: decoded.usuario,
        tipo: decoded.tipo,
      },
    });
  } catch (error) {
    console.error("❌ Error al verificar token:", error.message);
    res.status(401).json({ error: "Token inválido o expirado." });
  }
}