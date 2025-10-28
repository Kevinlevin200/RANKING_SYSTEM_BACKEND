import { MongoClient } from "mongodb";
import 'dotenv/config'

const uri = process.env.MONGO_URI;
const db_name = process.env.DB_NAME;

const cliente = new MongoClient(uri);
let db;

export async function ConnectDB(){
    try {
        await cliente.connect();
        console.log("DB conectada!!!");
        db = cliente.db(db_name);
    } catch (error) {
        console.error("Error al conectar la DB:", error)
    }
}

export function GetDB(){
    if(!db) throw new Error("No se ha conectado la DB!!");
    return db;
}