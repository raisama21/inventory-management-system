import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

export default function StockSavantLogo() {
    return (
        <div
            className={`${lusitana.className} flex items-end gap-2 leading-none text-white`}
        >
            <ArrowPathIcon className="h-10 w-10" />
            <p className="text-2xl">IMS</p>
        </div>
    );
}
