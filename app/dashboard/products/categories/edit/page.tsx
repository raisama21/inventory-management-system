import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/categories/edit-form";

export default function Edit() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: "Categories",
                        href: "/dashboard/products/categories",
                    },
                    {
                        label: "Edit Categories",
                        href: "/dashboard/products/categories/edit",
                        active: true,
                    },
                ]}
            />

            <Form />
        </main>
    );
}
