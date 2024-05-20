require("dotenv").config();
const postgres = require("postgres");

const sql = postgres(process.env.DATABASE_URL, {
    /**
    host: process.env.DATABASE_URL,
    port: process.env.PORT,
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    */
});

async function seedUsers() {
    try {
        await sql`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                username VARCHAR(64) NOT NULL,
                email VARCHAR(64) NOT NULL UNIQUE,
                password VARCHAR(128) NOT NULL,

                PRIMARY KEY (id)
            );
        `;

        console.log("Created 'users' table");
    } catch (error) {
        console.log("error while seeding users: ", error);
    }
}

async function seedProducts() {
    try {
        await sql`
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_status') THEN
                    create type product_status AS ENUM ('in stock', 'out of stock');
                END IF;
            END 
            $$;
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                product_name VARCHAR(255) NOT NULL,
                category VARCHAR(255) NOT NULL,
                price NUMERIC NOT NULL,
                quantity NUMERIC NOT NULL,
                description TEXT NOT NULL,
                image_url TEXT,
                status product_status NOT NULL DEFAULT 'in stock',

                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `;

        console.log("Created 'products' table");
    } catch (error) {
        console.log("error while seeding product: ", error);
    }
}

async function seedCategories() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS categories (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                names TEXT[] NOT NULL,

                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `;

        console.log("Created 'categories' table");
    } catch (error) {
        console.log("error while seeding categories: ", error);
    }
}

async function seedCustomers() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS customers (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                name VARCHAR(64) NOT NULL,
                email VARCHAR(64) UNIQUE NOT NULL,
                phone_number NUMERIC NOT NULL,
                image_url TEXT,

                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `;

        console.log("Created 'customers' table");
    } catch (error) {
        console.log("error while seeding customer: ", error);
    }
}

async function seedInvoices() {
    try {
        await sql`
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invoice_status') THEN
                    create type invoice_status AS ENUM ('paid', 'pending');
                END IF;
            END 
            $$;
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS invoices (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                customer_id UUID NOT NULL,
                product_id UUID NOT NULL,
                quantity NUMERIC NOT NULL,
                price NUMERIC NOT NULL,
                total_price NUMERIC NOT NULL,
                date DATE NOT NULL,
                status invoice_status NOT NULL,

                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (customer_id) REFERENCES customers(id) 
            );
        `;

        console.log("Created 'invoices' table");
    } catch (error) {
        console.log("error while seeding invoices: ", error);
    }
}

async function main() {
    await seedUsers();
    await seedProducts();
    await seedCategories();
    await seedCustomers();
    await seedInvoices();

    sql.end();
}

main();
