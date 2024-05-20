import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { AddCustomer } from "@/app/ui/customers/buttons";
import Table from "@/app/ui/customers/table";

export default function Customers() {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search customers..." />
                <AddCustomer />
            </div>

            <Table />
        </div>
    );
}
