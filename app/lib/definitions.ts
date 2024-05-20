export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
};

export type Product = {
    id: string;
    product_name: string;
    category: string;
    price: number;
    quantity: number;
    status: "in stock" | "out of stock";
    description: string;
    image_url: string;
};

export type Category = {
    id: string;
    user_id: string;
    names: string[];
};

export type Customer = {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    image_url: string;
};

export type Invoice = {
    id: string;
    user_id: string;
    customer_id: string;
    product_id: string;
    quantity: string;
    price: number;
    total_price: number;
    date: string;
    status: "paid" | "pending";
};

export type InvoiceTable = {
    id: string;
    name: string;
    email: string;
    total_price: number;
    date: string;
    status: "paid" | "pending";
};

export type InvoiceDetails = {
    id: string;
    product_name: string;
    category: string;
    price: number;
    name: string;
    email: string;
    phone_number: number;
    quantity: number;
    total_price: number;
    date: string;
    status: "paid" | "pending";
};

export type Revenue = {
    month: string;
    revenue: number;
};

export type CustomerField = {
    id: string;
    name: string;
};

export type JwtPayload = {
    user: { id: string };
    expires: string;
    iat: number;
    exp: number;
};
