// SERVER.JS - Backend con JWT, SemVer, y Rate Limit listo para Render
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import "dotenv/config.js";
import { ConnectDB } from "./config/db.js";
import routerUsuarios from "./routes/usuarios.routes.js";

const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST_NAME || "localhost";
const isProd = process.env.NODE_ENV === "production";
const API_VERSION = "v1";

// 🔒 Rate limiting configurable desde .env
const windowMinutes = parseInt(process.env.RATE_LIMIT_WINDOW?.replace("m", "")) || 15;
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX) || 100;

const limiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000,
  max: maxRequests,
  message: { error: "Demasiadas peticiones desde esta IP, intenta más tarde." },
});

// 🧩 Middlewares globales
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

// 🌍 CORS para Render, GitHub Pages y entorno local
app.use(
  cors({
    origin: [
      "https://tuusuario.github.io",      // 👉 Reemplaza con tu dominio de GitHub Pages
      "https://tubackend.onrender.com",   // 👉 Reemplaza con tu dominio en Render
      "http://localhost:5500",
      "http://localhost:4000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🧠 Log mínimo de solicitudes
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} - Origin: ${req.headers.origin || "desconocido"}`);
  next();
});

// 📦 Rutas versionadas (semver)
app.use(`/api/${API_VERSION}/usuarios`, routerUsuarios);

// 🩺 Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "✅ Backend operativo con JWT y SemVer",
    version: API_VERSION,
  });
});

// ❌ Manejador global de errores
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

// 🚀 Inicializar servidor y base de datos
ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}/api/${API_VERSION}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
    process.exit(1);
  });
