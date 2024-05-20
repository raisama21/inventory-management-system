"use server";

import {
    Category,
    Customer,
    Invoice,
    InvoiceDetails,
    InvoiceTable,
    Product,
    User,
} from "@/app/lib/definitions";
import { getSession } from "@/app/lib/utils";
import sql from "@/database/connect";

export async function getCustomers() {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        const customers = await sql<Customer[]>`
            SELECT * FROM customers WHERE user_id = ${session.user.id};
       `;

        return customers;
    } catch (error) {
        console.log("error while getting 'customers': ", error);
    }
}

export async function getCustomerDetails(customerId: string) {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        const [details] = await sql<Customer[]>`
            SELECT * FROM customers WHERE id = ${customerId};
        `;

        return details;
    } catch (error) {
        console.log("error while getting 'details': ", error);
    }
}

export async function getCategories() {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        const [categories] = await sql<Category[]>`
            SELECT * FROM categories WHERE user_id = ${session.user.id};
        `;

        return categories;
    } catch (error) {
        console.log("error while getting 'categories': ", error);
    }
}

export async function getProducts() {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        const products = await sql<Product[]>`
            SELECT * FROM products WHERE user_id = ${session.user.id};
        `;

        return products;
    } catch (error) {
        console.log("error while getting 'products': ", error);
    }
}

export async function getProductDetails(product_id: string) {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        const [details] = await sql<Product[]>`
            SELECT * FROM products WHERE id = ${product_id};
        `;

        return details;
    } catch (error) {
        console.log("error while getting 'details': ", error);
    }
}

export async function getInvoices() {
    try {
        const invoiceTable = await sql<InvoiceTable[]>`
            SELECT 
                invoices.id, 
                invoices.customer_id, 
                customers.name, 
                customers.email, 
                invoices.total_price, 
                invoices.date, 
                invoices.status
            FROM invoices INNER JOIN customers 
            ON invoices.customer_id = customers.id
        `;

        return invoiceTable;
    } catch (error) {
        console.log(
            "error while getting 'invoices' and 'customers' join: ",
            error
        );
    }
}

export async function getInvoice(invoiceId: string) {
    try {
        const [invoice] = await sql<Invoice[]>`
            SELECT * FROM invoices WHERE id = ${invoiceId};    
        `;

        return invoice;
    } catch (error) {
        console.log("error while getting one 'invoice': ", error);
    }
}

export async function getInvoiceDetails(invoiceId: string) {
    try {
        const [details] = await sql<InvoiceDetails[]>`
            SELECT
                invoices.id,
                products.product_name,
                products.category,
                products.price,
                customers.name,
                customers.email,
                customers.phone_number,
                invoices.quantity,
                invoices.total_price,
                invoices.date,
                invoices.status
            FROM invoices 
            INNER JOIN products ON products.id = invoices.product_id
            INNER JOIN customers ON customers.id = invoices.customer_id
            WHERE invoices.id = ${invoiceId};    
        `;

        return details;
    } catch (error) {
        console.log("error while getting invoice 'details': ", error);
    }
}

export async function getUserDetails() {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        const [user] = await sql<User[]>`
            SELECT * FROM users WHERE id = ${session.user.id}
        `;

        return user;
    } catch (error) {
        console.log("error while getting user details: ", error);
    }
}

export async function getCollectedAmount() {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        const [total_price] = await sql<{ total_price: number }[]>`
            SELECT total_price FROM invoices WHERE user_id = ${session.user.id} AND status = 'paid';
        `;

        return total_price;
    } catch (error) {
        console.log("error while trying to get collected amount: ", error);
    }
}

export async function getPendingAmount() {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        const [total_price] = await sql<{ total_price: number }[]>`
            SELECT total_price FROM invoices WHERE user_id = ${session.user.id} status = 'pending';
        `;

        return total_price;
    } catch (error) {
        console.log("error while trying to get pending amount: ", error);
    }
}

export async function getTotalInvoices() {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        const [invoice] = await sql<{ count: number }[]>`
            SELECT COUNT(*) FROM invoices where user_id = ${session.user.id};
        `;

        return invoice;
    } catch (error) {
        console.log("error while trying to get total invoices: ", error);
    }
}

export async function getTotalCustomers() {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        const [customer] = await sql<{ count: number }[]>`
            SELECT COUNT(*) FROM customers where user_id = ${session.user.id};
       `;

        return customer;
    } catch (error) {
        console.log("error while getting 'total customers': ", error);
    }
}
