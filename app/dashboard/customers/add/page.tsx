import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/customers/add-form";

export default function Add() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Customers", href: "/dashboard/customers" },
                    {
                        label: "Add Customers",
                        href: "/dashboard/customers/add",
                        active: true,
                    },
                ]}
            />

            <Form />
        </main>
    );
}
