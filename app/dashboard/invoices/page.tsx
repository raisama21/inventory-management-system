import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Table from "@/app/ui/invoices/table";

export default function Invoices() {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>

            <Table />
        </div>
    );
}
