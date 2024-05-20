"use client";

import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/buttons";
import { AddCategoryState, addCategory } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function Add() {
    const initialState = {} as AddCategoryState;
    const [state, dispatch] = useFormState(addCategory, initialState);

    return (
        <form action={dispatch}>
            <div className="mb-4">
                <label
                    htmlFor="names"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter your product categories name
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="names"
                            name="names"
                            type="text"
                            placeholder="Enter product categories name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <SquaresPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {state?.errors?.names && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.names[0]}
                    </p>
                )}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/products/categories"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Add Categories</Button>
            </div>
        </form>
    );
}
