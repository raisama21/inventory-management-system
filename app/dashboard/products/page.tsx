import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import Table from "@/app/ui/products/table";
import { AddProducts } from "@/app/ui/products/buttons";

export default function Products() {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
            </div>

            <div className="relative mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search products..." />
                <AddProducts />
            </div>

            <Table />
        </div>
    );
}
