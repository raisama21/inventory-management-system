import { getCustomers, getProducts } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";

export default async function Create() {
    const [customers, products] = await Promise.all([
        getCustomers(),
        getProducts(),
    ]);

    if (!customers || !products) {
        return;
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Invoices", href: "/dashboard/invoices" },
                    {
                        label: "Create Invoice",
                        href: "/dashboard/invoices/create",
                        active: true,
                    },
                ]}
            />

            <Form customers={customers} products={products} />
        </main>
    );
}
