import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import "dotenv/config.js";
import { ConnectDB } from "./config/db.js";
import routerUsuarios from "./routes/usuarios.routes.js";
import  routerRestaurantes  from "./routes/restaurante.routes.js";
import  routerReseña  from "./routes/reseña.routes.js";
import  routerPlatos  from "./routes/platos.routes.js";
import  routerRanking  from "./routes/ranking.routes.js";
import  routerCategoria  from "./routes/categoria.routes.js";

const app = express();


const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST_NAME || "localhost";
const API_VERSION = "v1";

const windowMinutes = parseInt(process.env.RATE_LIMIT_WINDOW?.replace("m", "")) || 15;
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX) || 100;

const limiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000,
  max: maxRequests,
  message: { error: "Demasiadas peticiones desde esta IP, intenta más tarde." },
});

app.use(limiter);
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://tuusuario.github.io",      
      "https://tubackend.onrender.com",   
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

app.use(`/api/${API_VERSION}/usuarios`, routerUsuarios);
app.use(`/api/${API_VERSION}/restaurantes`, routerRestaurantes);
app.use(`/api/${API_VERSION}/platos`, routerPlatos);
app.use(`/api/${API_VERSION}/reseña`, routerReseña);
app.use(`/api/${API_VERSION}/ranking`, routerRanking);
app.use(`/api/${API_VERSION}/categoria`, routerCategoria);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "✅ Backend operativo con JWT y SemVer",
    version: API_VERSION,
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

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
