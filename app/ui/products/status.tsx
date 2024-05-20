import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function ProductStatus({ status }: { status: string }) {
    return (
        <span
            className={clsx(
                "inline-flex items-center rounded-full px-2 py-1 text-xs",
                {
                    "bg-green-500 text-white": status === "in stock",
                    "bg-gray-100 text-gray-500": status === "out of stock",
                }
            )}
        >
            {status === "in stock" ? (
                <>
                    In stock
                    <CheckIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
            {status === "out of stock" ? (
                <>
                    Out of stock
                    <ClockIcon className="ml-1 w-4 text-gray-500" />
                </>
            ) : null}
        </span>
    );
}
