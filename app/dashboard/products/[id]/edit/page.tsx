import { getCategories, getProductDetails } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/products/edit-form";

export default async function Edit({
    params: { id },
}: {
    params: { id: string };
}) {
    const details = await getProductDetails(id);
    const categories = await getCategories();

    if (!details || !categories) {
        return;
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Products", href: "/dashboard/products" },
                    {
                        label: "Edit products",
                        href: "/dashboard/products/add",
                        active: true,
                    },
                ]}
            />

            <Form details={details} categories={categories} />
        </main>
    );
}
