"use client";

import Link from "next/link";
import {
    CheckIcon,
    ClockIcon,
    CurrencyRupeeIcon,
    PlusIcon,
    ShoppingBagIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/buttons";
import { Customer, Invoice, Product } from "@/app/lib/definitions";
import { UpdateInvoiceState, updateInvoice } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function Form({
    customers,
    products,
    invoice,
}: {
    customers: Customer[];
    products: Product[];
    invoice: Invoice;
}) {
    const initialState = {} as UpdateInvoiceState;
    const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
    const [state, dispatch] = useFormState(updateInvoiceWithId, initialState);
    const [productIdState, setProductIdState] = useState("");
    const [productQuantityState, setProductQuantityState] = useState(
        Number(invoice.quantity)
    );

    const price = products.filter((product) =>
        product.id === productIdState ? product : undefined
    );

    const totalPrice = price[0]?.price * productQuantityState;

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <label
                        htmlFor="customer"
                        className="mb-2 block text-sm font-medium"
                    >
                        Choose customer
                    </label>
                    <div className="relative">
                        <select
                            id="customer"
                            name="customerId"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="customer-error"
                        >
                            <option value="" disabled>
                                Select a customer
                            </option>
                            {customers.map((customer) => {
                                const isSelected =
                                    customer.id === invoice.customer_id
                                        ? true
                                        : false;

                                return (
                                    <option
                                        key={customer.id}
                                        value={customer.id}
                                        selected={isSelected}
                                    >
                                        {customer.name}
                                    </option>
                                );
                            })}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    {state?.errors?.customerId && (
                        <p className="text-sm font-medium text-red-500">
                            {state?.errors?.customerId[0]}
                        </p>
                    )}
                </div>

                {/* Product */}
                <div className="mb-4">
                    <label
                        htmlFor="productId"
                        className="mb-2 block text-sm font-medium"
                    >
                        Choose product
                    </label>
                    <div className="relative">
                        <select
                            id="productId"
                            name="productId"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="customer-error"
                            onChange={(e) => {
                                setProductIdState(e.target.value);
                            }}
                        >
                            <option value="" disabled>
                                Select a product
                            </option>
                            {products.map((product) => {
                                const isSelected =
                                    product.id === invoice.product_id
                                        ? true
                                        : false;

                                return (
                                    <option
                                        key={product.id}
                                        value={product.id}
                                        selected={isSelected}
                                    >
                                        {product.product_name}
                                    </option>
                                );
                            })}
                        </select>
                        <ShoppingBagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    {state?.errors?.productId && (
                        <p className="text-sm font-medium text-red-500">
                            {state?.errors?.productId[0]}
                        </p>
                    )}
                </div>

                {/* Quantity */}
                <div className="mb-4">
                    <label
                        htmlFor="quantity"
                        className="mb-2 block text-sm font-medium"
                    >
                        Enter quantity
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Enter product quantity"
                            defaultValue={invoice.quantity}
                            onChange={(e) => {
                                setProductQuantityState(Number(e.target.value));
                            }}
                        />
                        <PlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    {state?.errors?.quantity && (
                        <p className="text-sm font-medium text-red-500">
                            {state?.errors?.quantity[0]}
                        </p>
                    )}
                </div>

                {/* Product price */}
                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="mb-2 block text-sm font-medium"
                    >
                        Enter product price
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            id="price"
                            name="price"
                            defaultValue={price[0]?.price || invoice.price}
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Enter product price"
                        />
                        <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    {state?.errors?.price && (
                        <p className="text-sm font-medium text-red-500">
                            {state?.errors?.price[0]}
                        </p>
                    )}
                </div>

                {/* Product total price */}
                <div className="mb-4">
                    <label
                        htmlFor="totalPrice"
                        className="mb-2 block text-sm font-medium"
                    >
                        Enter product total price
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            id="totalPrice"
                            name="totalPrice"
                            defaultValue={totalPrice || invoice.total_price}
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Enter product total price"
                        />
                        <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    {state?.errors?.totalPrice && (
                        <p className="text-sm font-medium text-red-500">
                            {state?.errors?.totalPrice[0]}
                        </p>
                    )}
                </div>

                {/* Invoice Status */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    name="status"
                                    type="radio"
                                    value="pending"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    Pending <ClockIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="paid"
                                    name="status"
                                    type="radio"
                                    value="paid"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="paid"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Paid <CheckIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                {state?.errors?.status && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.status[0]}
                    </p>
                )}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/invoices"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Invoice</Button>
            </div>
        </form>
    );
}
