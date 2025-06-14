import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "listo_db",
})

export default pool