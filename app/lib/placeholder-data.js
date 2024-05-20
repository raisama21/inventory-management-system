const users = [
    {
        id: "7f6ec6fc-9d3c-4e5b-b49f-3b947cf076b8",
        username: "raisama",
        email: "freekinguse21@gmail.com",
        password: "adsf1234",
    },
];

const categories = {
    id: "",
    user_id: users[0].id,
    names: ["apparel", "footwear", "backpacks"],
};

const customers = [
    {
        id: "",
        user_id: users[0].id,
        name: "",
        email: "",
        phone_number: "",
        image_url: "",
    },
];

const products = [
    {
        id: "",
        user_id: users[0].id,
    },
];

const invoices = [
    {
        id: "",
        user_id: users[0].id,
        customer_id: customers[0].id,
        product_id: products[0].id,
    },
];

module.exports = {
    users,
    categories,
    customers,
    products,
    invoices,
};
