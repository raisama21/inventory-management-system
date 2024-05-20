"use client";

import {
    DocumentArrowUpIcon,
    ShoppingBagIcon,
    Squares2X2Icon,
    CurrencyRupeeIcon,
    PlusIcon,
    DocumentTextIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/buttons";
import { UpdateProductState, updateProduct } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Category, Product } from "@/app/lib/definitions";

export default function Edit({
    details,
    categories,
}: {
    details: Product;
    categories: Category;
}) {
    const initialState = {} as UpdateProductState;
    const updateProductWithId = updateProduct.bind(null, details.id);
    const [state, dispatch] = useFormState(updateProductWithId, initialState);

    return (
        <form action={dispatch}>
            {/* image */}
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                >
                    Choose a file
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="image"
                            name="image"
                            type="file"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <DocumentArrowUpIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
            </div>

            {/* product name */}
            <div className="mb-4">
                <label
                    htmlFor="productName"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter product name
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="productName"
                            name="productName"
                            type="text"
                            defaultValue={details.product_name}
                            placeholder="Enter product name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <ShoppingBagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {state?.errors?.productName && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.productName[0]}
                    </p>
                )}
            </div>

            {/* category */}
            <div className="mb-4">
                <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium"
                >
                    Select product category
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <select
                            id="category"
                            name="category"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.names.map((name) => {
                                const isSelected =
                                    name === details.category ? true : false;

                                return (
                                    <option
                                        key={name}
                                        value={name}
                                        selected={isSelected}
                                    >
                                        {name}
                                    </option>
                                );
                            })}
                        </select>
                        <Squares2X2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {state?.errors?.category && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.category[0]}
                    </p>
                )}
            </div>

            {/* price */}
            <div className="mb-4">
                <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter product price
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="price"
                            name="price"
                            type="number"
                            defaultValue={details.price}
                            placeholder="Enter product price"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {state?.errors?.price && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.price[0]}
                    </p>
                )}
            </div>

            {/* quantity */}
            <div className="mb-4">
                <label
                    htmlFor="quantity"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter product quantity
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            defaultValue={details.quantity}
                            placeholder="Enter product quantity"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <PlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {state?.errors?.quantity && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.quantity[0]}
                    </p>
                )}
            </div>

            {/* status */}
            <div className="mb-4">
                <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-medium"
                >
                    Select product status
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <select
                            id="status"
                            name="status"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        >
                            <option value="" disabled selected>
                                Select product status
                            </option>
                            <option value="in stock">In stock</option>
                            <option value="out of stock">Out of stock</option>
                        </select>
                        <CheckCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {state?.errors?.status && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.status[0]}
                    </p>
                )}
            </div>

            {/* description */}
            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter product description
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="description"
                            name="description"
                            type="text"
                            defaultValue={details.description}
                            placeholder="Enter product description"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {state?.errors?.description && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.description[0]}
                    </p>
                )}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/products"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Products</Button>
            </div>
        </form>
    );
}
