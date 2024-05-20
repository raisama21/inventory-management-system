import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/categories/add-form";

export default function Add() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: "Categories",
                        href: "/dashboard/products/categories",
                    },
                    {
                        label: "Add Categories",
                        href: "/dashboard/products/categories/add",
                        active: true,
                    },
                ]}
            />

            <Form />
        </main>
    );
}
