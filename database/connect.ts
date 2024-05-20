import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL as string, {
    /**
    host: process.env.DATABASE_URL,
    port: process.env.PORT,
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    */
});

export default sql;
