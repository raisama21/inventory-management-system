import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import Table from "@/app/ui/categories/table";
import { AddCategories } from "@/app/ui/categories/buttons";

export default function Categories() {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Categories</h1>
            </div>

            <div className="relative mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search Categories..." />
                <AddCategories />
            </div>

            <Table />
        </div>
    );
}
