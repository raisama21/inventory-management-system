import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/customers/edit-form";
import { getCustomerDetails } from "@/app/lib/data";

export default async function Edit({
    params: { id },
}: {
    params: { id: string };
}) {
    const response = await getCustomerDetails(id);
    if (!response) {
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

            <Form customer={response} />
        </main>
    );
}
