import { ConnectDB, GetDB } from "./config/db.js";
import bcrypt from "bcrypt";

async function seed() {
  await ConnectDB();
  const db = GetDB();

  // 🔒 Hasheamos contraseñas para los usuarios
  const hashUsuario1 = await bcrypt.hash("usuario123", 10);
  const hashUsuario2 = await bcrypt.hash("maria456", 10);
  const hashAdmin = await bcrypt.hash("admin123", 10);

  // 👤 Usuarios de ejemplo
  const usuarios = [
    {
      email: "juan.perez@example.com",
      usuario: "juanperez",
      contraseña: hashUsuario1,
      tipo: "usuario",
      creadoEn: new Date(),
    },
    {
      email: "maria.gomez@example.com",
      usuario: "mariagomez",
      contraseña: hashUsuario2,
      tipo: "usuario",
      creadoEn: new Date(),
    },
    {
      email: "admin@restaurantes.com",
      usuario: "adminRestaurantes",
      contraseña: hashAdmin,
      tipo: "admin",
      creadoEn: new Date(),
    },
  ];

  // Obtener IDs de usuarios insertados
  const usuariosInsertados = await db.collection("usuarios").insertMany(usuarios);
  const usuarioIds = Object.values(usuariosInsertados.insertedIds);

  // 🍽️ Restaurantes de ejemplo
  const restaurantes = [
    {
      nombre: "La Parrilla del Norte",
      descripcion: "Restaurante especializado en carnes a la parrilla y cortes premium con ambiente familiar y acogedor.",
      categoria: "Tradicional",
      ubicacion: "Calle 45 #23-67, Centro, Barrancabermeja",
      imagen: "https://example.com/parrilla-norte.jpg",
      aprobado: true,
      creadoEn: new Date(),
    },
    {
      nombre: "Sushi Fusion Express",
      descripcion: "Comida japonesa moderna con toques occidentales, rolls creativos y ambiente contemporáneo.",
      categoria: "Internacional",
      ubicacion: "Avenida Libertadores #89-34, Barrancabermeja",
      imagen: "https://example.com/sushi-fusion.jpg",
      aprobado: true,
      creadoEn: new Date(),
    },
    {
      nombre: "Burger Station",
      descripcion: "Hamburguesas artesanales con ingredientes frescos, papas crujientes y sodas ilimitadas.",
      categoria: "Comida rápida",
      ubicacion: "Centro Comercial Plaza Mayor, Local 205",
      imagen: "https://example.com/burger-station.jpg",
      aprobado: true,
      creadoEn: new Date(),
    },
    {
      nombre: "Verde y Salud",
      descripcion: "Opciones vegetarianas y veganas frescas, bowls nutritivos, smoothies naturales y postres sin azúcar.",
      categoria: "Vegetariano",
      ubicacion: "Carrera 12 #56-23, Barrio San Rafael",
      imagen: "https://example.com/verde-salud.jpg",
      aprobado: true,
      creadoEn: new Date(),
    },
    {
      nombre: "Le Petit Bistro",
      descripcion: "Cocina francesa contemporánea con ingredientes locales, vinos selectos y postres artesanales.",
      categoria: "Gourmet",
      ubicacion: "Calle 78 #34-12, Zona Exclusiva",
      imagen: "https://example.com/petit-bistro.jpg",
      aprobado: false,
      creadoEn: new Date(),
    },
  ];

  // Obtener IDs de restaurantes insertados
  const restaurantesInsertados = await db.collection("restaurantes").insertMany(restaurantes);
  const restauranteIds = Object.values(restaurantesInsertados.insertedIds);

  // 🍲 Platos de ejemplo
  const platos = [
    {
      nombre: "Churrasco Argentino",
      descripcion: "Jugoso corte de carne argentina con chimichurri casero, papas gratinadas y ensalada fresca.",
      categoria: "Tradicional",
      imagen: "https://example.com/churrasco.jpg",
      restauranteId: restauranteIds[0].toString(),
      creadoEn: new Date(),
    },
    {
      nombre: "Roll de Salmón Tropical",
      descripcion: "Salmón fresco, mango, aguacate y queso crema envuelto en arroz y alga nori con salsa de maracuyá.",
      categoria: "Internacional",
      imagen: "https://example.com/salmon-roll.jpg",
      restauranteId: restauranteIds[1].toString(),
      creadoEn: new Date(),
    },
    {
      nombre: "Mega Burger BBQ",
      descripcion: "Doble carne de res, queso cheddar, tocino ahumado, cebolla caramelizada y salsa barbecue especial.",
      categoria: "Comida rápida",
      imagen: "https://example.com/mega-burger.jpg",
      restauranteId: restauranteIds[2].toString(),
      creadoEn: new Date(),
    },
    {
      nombre: "Bowl Mediterráneo",
      descripcion: "Quinoa, garbanzos asados, hummus cremoso, vegetales frescos, aceitunas y aderezo de tahini.",
      categoria: "Vegetariano",
      imagen: "https://example.com/bowl-mediterraneo.jpg",
      restauranteId: restauranteIds[3].toString(),
      creadoEn: new Date(),
    },
    {
      nombre: "Coq au Vin",
      descripcion: "Pollo guisado en vino tinto con hongos silvestres, cebolla perla y hierbas provenzales.",
      categoria: "Gourmet",
      imagen: "https://example.com/coq-au-vin.jpg",
      restauranteId: restauranteIds[4].toString(),
      creadoEn: new Date(),
    },
    {
      nombre: "Pizza Vegetariana",
      descripcion: "Masa artesanal con berenjenas, pimientos, champiñones, aceitunas negras y mozzarella vegana.",
      categoria: "Vegetariano",
      imagen: "https://example.com/pizza-veggie.jpg",
      restauranteId: restauranteIds[3].toString(),
      creadoEn: new Date(),
    },
  ];

  await db.collection("platos").insertMany(platos);

  // ⭐ Reseñas de ejemplo
  const reseñas = [
    {
      comentario: "Excelente atención y la carne estaba en su punto perfecto. Definitivamente volveré con mi familia.",
      calificacion: 5,
      restauranteId: restauranteIds[0].toString(),
      usuarioId: usuarioIds[0].toString(),
      creadoEn: new Date(),
    },
    {
      comentario: "El sushi está muy fresco y los rolls son creativos. Me encantó el ambiente moderno del lugar.",
      calificacion: 4,
      restauranteId: restauranteIds[1].toString(),
      usuarioId: usuarioIds[1].toString(),
      creadoEn: new Date(),
    },
    {
      comentario: "Buenas hamburguesas pero el servicio fue un poco lento. Los precios son justos para la calidad.",
      calificacion: 3,
      restauranteId: restauranteIds[2].toString(),
      usuarioId: usuarioIds[0].toString(),
      creadoEn: new Date(),
    },
    {
      comentario: "Opciones saludables y deliciosas. El bowl mediterráneo tiene porciones generosas y está lleno de sabor.",
      calificacion: 5,
      restauranteId: restauranteIds[3].toString(),
      usuarioId: usuarioIds[1].toString(),
      creadoEn: new Date(),
    },
  ];

  await db.collection("reseñas").insertMany(reseñas);

  // 📂 Categorías de ejemplo
  const categorias = [
    {
      nombre: "Comida rápida",
      creadoEn: new Date(),
    },
    {
      nombre: "Gourmet",
      creadoEn: new Date(),
    },
    {
      nombre: "Vegetariano",
      creadoEn: new Date(),
    },
    {
      nombre: "Internacional",
      creadoEn: new Date(),
    },
    {
      nombre: "Tradicional",
      creadoEn: new Date(),
    },
  ];

  // 🧹 Limpiar colecciones previas
  await db.collection("usuarios").deleteMany({});
  await db.collection("restaurantes").deleteMany({});
  await db.collection("platos").deleteMany({});
  await db.collection("reseñas").deleteMany({});
  await db.collection("categorias").deleteMany({});

  // 💾 Insertar nuevos datos
  await db.collection("usuarios").insertMany(usuarios);
  const restaurantesResult = await db.collection("restaurantes").insertMany(restaurantes);
  const restauranteIdsActualizados = Object.values(restaurantesResult.insertedIds);

  // Actualizar platos con los IDs correctos de restaurantes
  platos[0].restauranteId = restauranteIdsActualizados[0].toString();
  platos[1].restauranteId = restauranteIdsActualizados[1].toString();
  platos[2].restauranteId = restauranteIdsActualizados[2].toString();
  platos[3].restauranteId = restauranteIdsActualizados[3].toString();
  platos[4].restauranteId = restauranteIdsActualizados[4].toString();
  platos[5].restauranteId = restauranteIdsActualizados[3].toString();

  await db.collection("platos").insertMany(platos);

  // Actualizar reseñas con los IDs correctos
  const usuariosResult = await db.collection("usuarios").find({}).toArray();
  reseñas[0].restauranteId = restauranteIdsActualizados[0].toString();
  reseñas[0].usuarioId = usuariosResult[0]._id.toString();
  reseñas[1].restauranteId = restauranteIdsActualizados[1].toString();
  reseñas[1].usuarioId = usuariosResult[1]._id.toString();
  reseñas[2].restauranteId = restauranteIdsActualizados[2].toString();
  reseñas[2].usuarioId = usuariosResult[0]._id.toString();
  reseñas[3].restauranteId = restauranteIdsActualizados[3].toString();
  reseñas[3].usuarioId = usuariosResult[1]._id.toString();

  await db.collection("reseñas").insertMany(reseñas);
  await db.collection("categorias").insertMany(categorias);

  console.log("✅ Base de datos poblada con éxito.");
  console.log(`📊 Estadísticas:`);
  console.log(`   - ${usuarios.length} usuarios creados`);
  console.log(`   - ${restaurantes.length} restaurantes creados`);
  console.log(`   - ${platos.length} platos creados`);
  console.log(`   - ${reseñas.length} reseñas creadas`);
  console.log(`   - ${categorias.length} categorías creadas`);

  process.exit();
}

seed();