import { getCustomers, getInvoice, getProducts } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";

export default async function Edit({
    params: { id },
}: {
    params: { id: string };
}) {
    const [customers, products, invoice] = await Promise.all([
        getCustomers(),
        getProducts(),
        getInvoice(id),
    ]);

    if (!customers || !products || !invoice) {
        return;
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Invoices", href: "/dashboard/invoices" },
                    {
                        label: "Edit Invoice",
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />

            <Form customers={customers} products={products} invoice={invoice} />
        </main>
    );
}
