// src/middlewares/verificarSesion.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verificarSesion(req, res, next) {
  try {
    console.log("🔐 [verificarSesion] Verificando token...");

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Token no proporcionado");
      return res.status(401).json({ error: "Token no proporcionado o formato inválido." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("👤 Usuario autenticado:", decoded.email, "- Tipo:", decoded.tipo);

    if (!decoded || !decoded.tipo) {
      console.log("❌ Token sin tipo de usuario");
      return res.status(403).json({ error: "Token inválido o sin permisos." });
    }

    // ✅ PERMITIR ACCESO A TODOS LOS TIPOS DE USUARIOS AUTENTICADOS
    // (usuario, empleado, admin)
    req.usuario = decoded; // Guardar info del usuario en la request
    console.log("✅ Acceso permitido para:", decoded.tipo);
    next();

  } catch (error) {
    console.error("❌ Error al verificar token:", error.message);
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
}


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

export function verificarUsuario(req, res, next) {
  try {
    console.log("👤 [verificarUsuario] Verificando token...");

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado o formato inválido." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.tipo !== "usuario") {
      return res.status(403).json({ error: "Acceso permitido solo para clientes." });
    }

    req.usuario = decoded;
    console.log("✅ Cliente autorizado:", decoded.email);
    next();

  } catch (error) {
    console.error("❌ Error al verificar token:", error.message);
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
}