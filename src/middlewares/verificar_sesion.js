// src/middlewares/verificarSesion.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * 🔐 Middleware para verificar que el usuario tenga sesión activa mediante JWT
 * y sea un usuario regular (no admin)
 */
export function verificarSesion(req, res, next) {
  try {
    console.log("🔐 [verificarSesion] Verificando token...");

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado o formato inválido." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("👤 Usuario autenticado:", decoded);

    if (!decoded || !decoded.tipo) {
      return res.status(403).json({ error: "Token inválido o sin permisos." });
    }

    // Solo permitir acceso a usuarios regulares (no administradores)
    if (decoded.tipo !== "usuario") {
      return res.status(403).json({ error: "Acceso permitido solo para usuarios." });
    }

    req.usuario = decoded; // Guardar info del usuario en la request
    next();

  } catch (error) {
    console.error("❌ Error al verificar token:", error.message);
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
}

/**
 * 🛡️ Middleware para verificar que el usuario sea administrador
 */
export function verificarAdmin(req, res, next) {
  try {
    console.log("🛡️ [verificarAdmin] Verificando token...");

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado o formato inválido." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.tipo !== "admin") {
      return res.status(403).json({ error: "Acceso permitido solo para administradores." });
    }

    req.usuario = decoded;
    console.log("✅ Administrador autorizado:", decoded.email);
    next();

  } catch (error) {
    console.error("❌ Error al verificar token:", error.message);
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
}
