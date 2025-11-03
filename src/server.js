import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import "dotenv/config.js";
import { ConnectDB } from "./config/db.js";
import routerUsuarios from "./routes/usuarios.routes.js";
import routerRestaurantes from "./routes/restaurante.routes.js";
import routerResena from "./routes/reseña.routes.js";
import routerPlatos from "./routes/platos.routes.js";
import routerRanking from "./routes/ranking.routes.js";
import routerCategoria from "./routes/categoria.routes.js";

const app = express();

// ✅ Render proporciona el PORT automáticamente
const PORT = process.env.PORT || 4000;
const API_VERSION = "v1";

const windowMinutes = parseInt(process.env.RATE_LIMIT_WINDOW?.replace("m", "")) || 15;
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX) || 100;

const limiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000,
  max: maxRequests,
  message: { error: "Demasiadas peticiones desde esta IP, intenta más tarde." },
});

// ✅ CONFIGURACIÓN CORS PARA GITHUB PAGES Y LOCAL
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://kevinlevin200.github.io", // ✅ GitHub Pages (sin barra final)
      "https://ranking-system-backend.onrender.com",
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:4000",
      "http://127.0.0.1:4000"
    ];

    // Permitir peticiones sin origin (Postman, Thunder Client, Render health checks)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ Origen bloqueado: ${origin}`);
      callback(new Error("No autorizado por CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Request-Id"],
  maxAge: 86400, // Cache preflight por 24 horas
};

// ✅ APLICAR CORS ANTES DE RATE LIMIT
app.use(cors(corsOptions));

app.use(limiter);
app.use(express.json());

// 🧠 Log mínimo de solicitudes
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} - Origin: ${req.headers.origin || "sin origin"}`);
  next();
});

// ✅ RUTAS DE LA API
app.use(`/api/${API_VERSION}/usuarios`, routerUsuarios);
app.use(`/api/${API_VERSION}/restaurantes`, routerRestaurantes);
app.use(`/api/${API_VERSION}/platos`, routerPlatos);
app.use(`/api/${API_VERSION}/resena`, routerResena);
app.use(`/api/${API_VERSION}/ranking`, routerRanking);
app.use(`/api/${API_VERSION}/categoria`, routerCategoria);

// ✅ HEALTH CHECK (importante para Render)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "✅ Backend operativo",
    version: API_VERSION,
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "✅ Backend operativo con JWT y SemVer",
    version: API_VERSION,
    timestamp: new Date().toISOString()
  });
});

// ✅ MANEJO DE RUTAS NO ENCONTRADAS
app.use((req, res) => {
  res.status(404).json({ 
    error: "Ruta no encontrada",
    path: req.path,
    method: req.method
  });
});

// ✅ MANEJO DE ERRORES GLOBAL
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  
  // Error de CORS
  if (err.message.includes("CORS")) {
    return res.status(403).json({ 
      error: "Acceso bloqueado por CORS",
      origin: req.headers.origin 
    });
  }
  
  res.status(500).json({ error: "Error interno del servidor" });
});

// ✅ INICIAR SERVIDOR (escuchar en 0.0.0.0 para Render)
ConnectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`🌍 API disponible en: /api/${API_VERSION}`);
      console.log(`📡 CORS habilitado para GitHub Pages y localhost`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
    process.exit(1);
  });