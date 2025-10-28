import swaggerUi from "swagger-ui-express";
import fs from "fs";

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json"));
export default [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];