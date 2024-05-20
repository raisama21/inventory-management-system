"use client";

import {
    UserIcon,
    EnvelopeIcon,
    DocumentArrowUpIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/buttons";
import { AddCustomerState, addCustomer } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function Create() {
    const initialState = {} as AddCustomerState;
    const [state, dispatch] = useFormState(addCustomer, initialState);

    return (
        <form action={dispatch}>
            {/* name */}
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter customer name
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter customer name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {state?.errors?.name && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.name[0]}
                    </p>
                )}
            </div>

            {/* phone number */}
            <div className="mb-4">
                <label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter customer phone number
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="number"
                            placeholder="Enter customer phone number"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {state?.errors?.phoneNumber && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.phoneNumber[0]}
                    </p>
                )}
            </div>

            {/* email */}
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter customer email
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter customer email"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {state?.errors?.email && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.email[0]}
                    </p>
                )}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Add Customer</Button>
            </div>
        </form>
    );
}
