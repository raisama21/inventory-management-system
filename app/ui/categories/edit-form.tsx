"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/buttons";
import { updateCategory } from "@/app/lib/actions";

export default function Add() {
    const searchParams = useSearchParams();

    const name = searchParams.get("name");
    if (!name) {
        return;
    }

    const updateCategoryWithId = updateCategory.bind(null, name);

    return (
        <form action={updateCategoryWithId}>
            <div className="mb-4">
                <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter your product category name
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="category"
                            name="category"
                            defaultValue={name}
                            type="text"
                            placeholder="Enter product category name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <SquaresPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/products/categories"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Customer</Button>
            </div>
        </form>
    );
}
