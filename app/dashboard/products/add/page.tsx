import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/products/add-form";
import { getCategories } from "@/app/lib/data";

export default async function Add() {
    const response = await getCategories();
    if (!response) {
        return;
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Products", href: "/dashboard/products" },
                    {
                        label: "Add products",
                        href: "/dashboard/products/add",
                        active: true,
                    },
                ]}
            />

            <Form categories={response} />
        </main>
    );
}
