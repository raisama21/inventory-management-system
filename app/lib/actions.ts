"use server";

import "dotenv/config";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import sql from "@/database/connect";
import { Customer, User } from "@/app/lib/definitions";
import { storage } from "@/firebase";
import {
    convertImageToUint8Array,
    getImageUrl,
    getSession,
    uploadImage,
} from "@/app/lib/utils";
import { revalidatePath } from "next/cache";

const SignupFormSchema = z.object({
    username: z
        .string()
        .trim()
        .nonempty("please enter a username")
        .min(3, { message: "username must contain at least 3 character" }),
    email: z
        .string()
        .trim()
        .nonempty("please enter your email address")
        .email({ message: "please enter a valid email" }),
    password: z
        .string()
        .trim()
        .nonempty("please choose a password")
        .min(8, { message: "password must contain at least 8 character" })
        .max(64, { message: "password must contain at most 64 character" }),
});

export type SignupState = {
    errors?: {
        username?: string[] | undefined;
        email?: string[] | undefined;
        password?: string[] | undefined;
    };

    user?: {
        id?: string | undefined;
    };
};

export async function createUser(
    prevState: SignupState | undefined,
    formData: FormData
) {
    const formFields = SignupFormSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const { username, email, password } = formFields.data;

    const [result] = await sql<User[]>`
        SELECT * FROM users WHERE email = ${email};
    `;

    if (email === result?.email) {
        return {
            errors: { email: ["user already exists with this email"] },
        };
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    try {
        const [user] = await sql<{ id: string }[]>`
             INSERT INTO users (username, email, password)
             VALUES (${username}, ${email}, ${hash})
             RETURNING id
         `;

        if (user?.id) {
            return { user };
        }
    } catch (error) {
        console.log("error while creating 'user': ", error);
    }
}

const LoginFormSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("please enter your email address")
        .email({ message: "please enter a valid email" }),
    password: z.string().trim().nonempty("please enter your password"),
});

export type LoginState = {
    errors?: {
        email?: string[] | undefined;
        password?: string[] | undefined;
    };

    user?: {
        id?: string | undefined;
    };
};

export async function authentication(
    prevState: LoginState | undefined,
    formData: FormData
) {
    const formFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = formFields.data;

    const [result] = await sql<User[]>`
        SELECT * FROM users WHERE email = ${email};
    `;

    if (email !== result?.email) {
        return {
            errors: {
                email: ["email or password is incorrect"],
                password: ["email or password is incorrect"],
            },
        };
    }

    const compare = await bcrypt.compare(password, result?.password);
    if (!compare) {
        return {
            errors: {
                email: ["email or password is incorrect"],
                password: ["email or password is incorrect"],
            },
        };
    }

    const [user] = await sql<{ id: string }[]>`
        SELECT id FROM users WHERE email = ${email}
   `;

    const expires = new Date(Date.now() + 72 * 60 * 60 * 1000);
    const session = encrypt({ user, expires });

    cookies().set("auth_session", session, { expires, httpOnly: true });

    if (cookies().get("auth_session")?.value) {
        return { user };
    }
}

export async function logout() {
    cookies().set("auth_session", "", { expires: new Date(0) });

    if (cookies().get("auth_session")?.value === "") {
        redirect("/login");
    }
}

function encrypt(payload: any) {
    payload = jwt.sign(payload, `${process.env.SECRET_KEY}`, {
        expiresIn: "3d",
    });

    return payload;
}

const AddCustomerFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "please enter a name")
        .min(3, { message: "username must contain at least 3 character" }),
    email: z
        .string()
        .trim()
        .min(1, "please enter your email address")
        .email({ message: "please enter a valid email" }),
    phoneNumber: z.number().min(1, { message: "please enter a phone number" }),
});

export type AddCustomerState = {
    errors?: {
        name?: string[] | undefined;
        email?: string[] | undefined;
        phoneNumber?: string[] | undefined;
    };
};

export async function addCustomer(
    prevState: AddCustomerState | undefined,
    formData: FormData
) {
    const session = getSession();
    if (!session) {
        return;
    }

    const formFields = AddCustomerFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phoneNumber: Number(formData.get("phoneNumber")),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, phoneNumber } = formFields.data;

    const [result] = await sql<Customer[]>`
        SELECT * FROM customers WHERE email = ${email};
    `;

    if (email === result?.email) {
        return {
            errors: { email: ["customer already exists with this email"] },
        };
    }

    try {
        await sql<{ id: string }[]>`
            INSERT INTO customers (
                user_id, 
                name, 
                email, 
                phone_number
            ) 
            VALUES (
                ${session.user.id}, 
                ${name}, 
                ${email}, 
                ${phoneNumber}
            ) 
        `;
    } catch (error) {
        console.log("error while creating 'customer': ", error);
    }

    revalidatePath("/dashboard/customers/add");
    redirect("/dashboard/customers");
}

const UpdateCustomerFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "please enter a name" })
        .min(3, { message: "username must contain at least 3 character" }),
    email: z
        .string()
        .trim()
        .min(1, { message: "please enter your email address" })
        .email({ message: "please enter a valid email" }),
    phoneNumber: z.number().min(1, { message: "please enter a phone number" }),
});

export type UpdateCustomerState = {
    errors?: {
        name?: string[] | undefined;
        email?: string[] | undefined;
        phoneNumber?: string[] | undefined;
    };
};

export async function updateCustomer(
    customerId: string,
    prevState: UpdateCustomerState | undefined,
    formData: FormData
) {
    const session = getSession();
    if (!session) {
        return;
    }

    const formFields = UpdateCustomerFormSchema.safeParse({
        image: formData.get("image"),
        name: formData.get("name"),
        email: formData.get("email"),
        phoneNumber: Number(formData.get("phoneNumber")),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const { image, name, email, phoneNumber } = formFields.data;

    try {
        const uint8 = await convertImageToUint8Array(image as File);

        await uploadImage(
            storage,
            uint8,
            `customers/${session.user.id}/${customerId}/${image.name}`
        );

        const imageUrl = await getImageUrl(
            storage,
            `customers/${session.user.id}/${customerId}`
        );

        await sql`
            UPDATE customers SET 
                name = ${name},
                email = ${email},
                phone_number = ${phoneNumber},
                image_url = ${imageUrl} 
            WHERE id = ${customerId}
        `;
    } catch (error) {
        console.log("error while updating 'customer': ", error);
    }

    revalidatePath(`/dashboard/customers/${customerId}/edit`);
    redirect("/dashboard/customers/");
}

export async function deleteCustomer(customerId: string) {
    try {
        await sql`
            DELETE FROM customers WHERE id = ${customerId}
       `;
    } catch (error) {
        console.log("error while deleting 'customer': ", error);
    }

    revalidatePath(`/dashboard/customers/`);
    redirect("/dashboard/customers/");
}

const AddProductFormSchema = z.object({
    image: z.any(),
    productName: z
        .string()
        .trim()
        .min(1, { message: "please enter a product name" })
        .min(3, { message: "product must contain at least 3 character" }),
    category: z.string().trim(),
    price: z.number().min(1, { message: "please enter an amount" }),
    quantity: z.number().min(1, { message: "please enter a quantity" }),
    status: z.string().trim(),
    description: z
        .string()
        .trim()
        .min(1, { message: "please enter a description" })
        .min(10, { message: "description must contain at least 10 character" }),
});

export type AddProductState = {
    errors?: {
        image?: string[] | undefined;
        productName?: string[] | undefined;
        category?: string[] | undefined;
        price?: string[] | undefined;
        quantity?: string[] | undefined;
        status?: string[] | undefined;
        description?: string[] | undefined;
    };
};

export async function addProduct(
    prevState: AddProductState | undefined,
    formData: FormData
) {
    const session = getSession();
    if (!session) {
        return;
    }

    const formFields = AddProductFormSchema.safeParse({
        image: formData.get("image"),
        productName: formData.get("productName"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        quantity: Number(formData.get("quantity")),
        status: formData.get("status"),
        description: formData.get("description"),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const {
        image,
        productName,
        category,
        price,
        quantity,
        status,
        description,
    } = formFields.data;

    try {
        const [product] = await sql<{ id: string }[]>`
            INSERT INTO products (
                user_id, 
                product_name, 
                category,
                price, 
                quantity, 
                status,
                description
            ) 
            VALUES (
                ${session.user.id},
                ${productName},
                ${category},
                ${price},
                ${quantity},
                ${status},
                ${description}
            )
            RETURNING id;
        `;

        const uint8 = await convertImageToUint8Array(image as File);

        await uploadImage(
            storage,
            uint8,
            `products/${session.user.id}/${product.id}/${image.name}`
        );

        const imageUrl = await getImageUrl(
            storage,
            `products/${session.user.id}/${product.id}`
        );

        await sql`
             UPDATE products SET image_url = ${imageUrl} WHERE id = ${product.id};
         `;
    } catch (error) {
        console.log("error while adding 'products': ", error);
    }

    revalidatePath("/dashboard/products/add");
    redirect("/dashboard/products/");
}

const UpdateProductFormSchema = z.object({
    image: z.any(),
    productName: z.string().trim(),
    category: z.string().trim(),
    price: z.number(),
    quantity: z.number(),
    status: z.string().trim(),
    description: z.string().trim(),
});

export type UpdateProductState = {
    errors?: {
        image?: string[] | undefined;
        productName?: string[] | undefined;
        category?: string[] | undefined;
        price?: string[] | undefined;
        quantity?: string[] | undefined;
        status?: string[] | undefined;
        description?: string[] | undefined;
    };
};

export async function updateProduct(
    productId: string,
    prevState: UpdateProductState | undefined,
    formData: FormData
) {
    const session = getSession();
    if (!session) {
        return;
    }

    const formFields = UpdateProductFormSchema.safeParse({
        image: formData.get("image"),
        productName: formData.get("productName"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        quantity: Number(formData.get("quantity")),
        status: formData.get("status"),
        description: formData.get("description"),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const {
        image,
        productName,
        category,
        price,
        quantity,
        status,
        description,
    } = formFields.data;

    const uint8 = await convertImageToUint8Array(image as File);

    await uploadImage(
        storage,
        uint8,
        `products/${session.user.id}/${productId}/${image.name}`
    );

    const imageUrl = await getImageUrl(
        storage,
        `products/${session.user.id}/${productId}`
    );

    try {
        await sql`
            UPDATE products SET
                product_name = ${productName},
                category = ${category},
                price = ${price},
                quantity = ${quantity},
                status = ${status},
                description = ${description},
                image_url = ${imageUrl}
            WHERE id = ${productId}
        `;
    } catch (error) {
        console.log("error while updating 'product': ", error);
    }

    revalidatePath(`/dashboard/products${productId}/edit`);
    redirect("/dashboard/products/");
}

export async function deleteProduct({ id }: { id: string }) {
    try {
        await sql`
            DELETE FROM products WHERE id = ${id};
        `;
    } catch (error) {
        console.log("error while deleting 'product': ", error);
    }

    revalidatePath("/dashboard/products");
}

const AddCategoryFormSchema = z.object({
    names: z.string().trim().min(1, { message: "please enter a names" }),
});

export type AddCategoryState = {
    errors?: {
        names?: string[] | undefined;
    };
};

export async function addCategory(
    prevState: AddCategoryState | undefined,
    formData: FormData
) {
    const session = getSession();
    if (!session) {
        return;
    }

    const formFields = AddCategoryFormSchema.safeParse({
        names: formData.get("names"),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const result = await sql<{ names: string[] }[]>`
       SELECT names FROM categories WHERE user_id = ${session.user.id}; 
   `;

    const { names } = formFields.data;

    try {
        if (result.length !== 0) {
            await sql`
                UPDATE categories SET names[${result[0].names.length + 1}] = ${names}
                WHERE user_id = ${session.user.id};
            `;
        }

        await sql` 
            INSERT INTO categories (user_id, names)
            VALUES (${session.user.id}, ARRAY[${names}])
        `;
    } catch (error) {
        console.log("error while adding 'categories': ", error);
    }

    revalidatePath("/dashboard/products/categories/add");
    redirect("/dashboard/products/categories");
}

const UpdateCategoryFormSchema = z.object({
    names: z.string().trim().min(1, { message: "please enter a names" }),
});

export async function updateCategory(oldName: string, formData: FormData) {
    const session = getSession();
    if (!session) {
        return;
    }

    const formFields = UpdateCategoryFormSchema.safeParse({
        names: formData.get("category"),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const { names } = formFields.data;

    try {
        await sql`
           UPDATE categories SET names [array_position(names, ${oldName})] = ${names}
           WHERE user_id = ${session.user.id};
        `;
    } catch (error) {
        console.log("error while updating 'categories': ", error);
    }

    revalidatePath("/dashboard/products/categories/edit");
    redirect("/dashboard/products/categories");
}

export async function deleteCategory(name: string) {
    const session = getSession();
    if (!session) {
        return;
    }

    try {
        await sql`
            UPDATE categories SET names = array_remove(names, ${name})
            WHERE user_id = ${session.user.id}
       `;
    } catch (error) {
        console.log("error while deleting 'categories': ", error);
    }

    revalidatePath("/dashboard/products/categories");
}

const CreateInvoiceFormSchema = z.object({
    customerId: z.string(),
    productId: z.string(),
    quantity: z.number().min(1, { message: "please enter a quantity" }),
    price: z.number().min(1, { message: "please enter a price" }),
    totalPrice: z.number().min(1, { message: "please enter total price" }),
    status: z.string(),
});

export type CreateInvoiceState = {
    errors?: {
        customerId?: string[] | undefined;
        productId?: string[] | undefined;
        quantity?: string[] | undefined;
        price?: string[] | undefined;
        totalPrice?: string[] | undefined;
        status?: string[] | undefined;
    };
};

export async function createInvoice(
    prevState: CreateInvoiceState | undefined,
    formData: FormData
) {
    const session = getSession();
    if (!session) {
        return;
    }

    const formFields = CreateInvoiceFormSchema.safeParse({
        customerId: formData.get("customerId"),
        productId: formData.get("productId"),
        quantity: Number(formData.get("quantity")),
        price: Number(formData.get("price")),
        totalPrice: Number(formData.get("totalPrice")),
        status: formData.get("status"),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const { customerId, productId, quantity, price, totalPrice, status } =
        formFields.data;

    const date = new Date().toDateString();

    try {
        await sql`
            INSERT INTO invoices (
                user_id, 
                customer_id, 
                product_id,
                quantity,
                price,
                total_price,
                date,
                status
            )
            VALUES (
                ${session.user.id},
                ${customerId},
                ${productId},
                ${quantity},
                ${price},
                ${totalPrice},
                ${date},
                ${status}
            )
       `;
    } catch (error) {
        console.log("error while creating 'invoice': ", error);
    }

    revalidatePath("/dashboard/invoices/create");
    redirect("/dashboard/invoices/");
}

const UpdateInvoiceFormSchema = z.object({
    customerId: z.string(),
    productId: z.string(),
    quantity: z.number().min(1, { message: "please enter a quantity" }),
    price: z.number().min(1, { message: "please enter a price" }),
    totalPrice: z.number().min(1, { message: "please enter total price" }),
    status: z.string(),
});

export type UpdateInvoiceState = {
    errors?: {
        customerId?: string[] | undefined;
        productId?: string[] | undefined;
        quantity?: string[] | undefined;
        price?: string[] | undefined;
        totalPrice?: string[] | undefined;
        status?: string[] | undefined;
    };
};

export async function updateInvoice(
    invoiceId: string,
    prevState: UpdateInvoiceState | undefined,
    formData: FormData
) {
    const session = getSession();
    if (!session) {
        return;
    }

    const formFields = CreateInvoiceFormSchema.safeParse({
        customerId: formData.get("customerId"),
        productId: formData.get("productId"),
        quantity: Number(formData.get("quantity")),
        price: Number(formData.get("price")),
        totalPrice: Number(formData.get("totalPrice")),
        status: formData.get("status"),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const { customerId, productId, quantity, price, totalPrice, status } =
        formFields.data;

    const date = new Date().toDateString();

    try {
        await sql`
            UPDATE invoices SET 
                customer_id = ${customerId},
                product_id = ${productId},
                quantity = ${quantity}, 
                price = ${price},
                total_price = ${totalPrice},
                date = ${date},
                status = ${status}
            WHERE id = ${invoiceId};
        `;
    } catch (error) {
        console.log("error while updating 'invoice': ", error);
    }

    revalidatePath(`/dashboard/invoices/${invoiceId}/edit`);
    redirect("/dashboard/invoices/");
}

export async function deleteInvoice(invoiceId: string) {
    try {
        await sql`
            DELETE FROM invoices WHERE id = ${invoiceId};
        `;
    } catch (error) {
        console.log("error while deleting 'invoice': ", error);
    }

    revalidatePath("/dashboard/invoices/");
    redirect("/dashboard/invoices/");
}

const UpdateProfileFormSchema = z.object({
    username: z
        .string()
        .trim()
        .nonempty("please enter a username")
        .min(3, { message: "username must contain at least 3 character" }),
    email: z
        .string()
        .trim()
        .nonempty("please enter your email address")
        .email({ message: "please enter a valid email" }),
});

export type UpdateProfileState = {
    errors?: {
        username?: string[] | undefined;
        email?: string[] | undefined;
    };

    user?: {
        id?: string | undefined;
    };
};

export async function updateUser(formData: FormData) {
    const session = getSession();
    if (!session) {
        return;
    }

    const formFields = UpdateProfileFormSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
    });

    if (!formFields.success) {
        return { errors: formFields.error.flatten().fieldErrors };
    }

    const { username, email } = formFields.data;

    try {
        await sql`
            UPDATE users SET 
                username = ${username},
                email = ${email}
            WHERE id = ${session.user.id};
        `;
    } catch (error) {
        console.log("error while updating 'user': ", error);
    }

    revalidatePath("/dashboard/profile");
    redirect("/dashboard/profile");
}

const ChangePasswordFormSchema = z.object({
    oldPassword: z
        .string()
        .trim()
        .min(1, { message: "please choose a password" })
        .min(8, { message: "password must contain at least 8 character" })
        .max(64, { message: "password must contain at most 64 character" }),
    newPassword: z
        .string()
        .trim()
        .min(1, { message: "please choose a password" })
        .min(8, { message: "password must contain at least 8 character" })
        .max(64, { message: "password must contain at most 64 character" }),
    reEnterPassword: z
        .string()
        .trim()
        .min(1, { message: "please choose a password" })
        .min(8, { message: "password must contain at least 8 character" })
        .max(64, { message: "password must contain at most 64 character" }),
});

export type ChangePasswordState = {
    errors?: {
        oldPassword?: string[] | undefined;
        newPassword?: string[] | undefined;
        reEnterPassword?: string[] | undefined;
    };
};

export async function changePassword(
    prevState: ChangePasswordState | undefined,
    formData: FormData
) {
    const session = getSession();
    if (!session) {
        return;
    }

    const formFields = ChangePasswordFormSchema.safeParse({
        oldPassword: formData.get("oldPassword"),
        newPassword: formData.get("newPassword"),
        reEnterPassword: formData.get("reEnterPassword"),
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const { oldPassword, newPassword, reEnterPassword } = formFields.data;

    const [user] = await sql<{ password: string }[]>`
        SELECT password FROM users WHERE id = ${session.user.id}
    `;

    const compare = await bcrypt.compare(oldPassword, user?.password);
    if (!compare) {
        return {
            errors: {
                oldPassword: ["your old password is incorrect"],
            },
        };
    }

    if (newPassword !== reEnterPassword) {
        return {
            errors: {
                newPassword: ["password do not match"],
                reEnterPassword: ["password do not match"],
            },
        };
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(newPassword, salt);

    try {
        await sql`
            UPDATE users SET password = ${hash} WHERE id = ${session.user.id}
        `;
    } catch (error) {
        console.log("error while changing password: ", error);
    }

    revalidatePath("/dashboard/profile");
    redirect("/dashboard/profile");
}
