import { Pool } from "pg";
import "dotenv/config"

const pool = new Pool({
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "123",
    host: process.env.PGHOST || "localhost",
    port: 5432,
    database: process.env.PGDATABASE || "listo_db",
    ssl: process.env.PGSSLMODE === "require"
        ? {
            rejectUnauthorized: false, // or true if you have a valid cert
        }
        : false,
    channelBinding: process.env.PGCHANNELBINDING === "require" ? "require" : "disable",
})

export default pool