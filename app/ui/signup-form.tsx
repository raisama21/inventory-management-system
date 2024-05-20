"use client";

import Link from "next/link";
import { SignupState, createUser } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";
import { redirect } from "next/navigation";

export default function SignupForm() {
    const initialState = {} as SignupState;
    const [state, dispatch] = useFormState(createUser, initialState);

    if (state?.user?.id) {
        redirect("/login");
    }

    return (
        <form action={dispatch}>
            <div className="pb-2">
                <div className="pb-1">
                    <label htmlFor="username" className="text-sm font-semibold">
                        User name
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="border-neutral-1/40 w-full rounded-lg border px-4 py-1"
                        autoComplete="off"
                    />
                </div>

                {state?.errors?.username && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.username[0]}
                    </p>
                )}
            </div>

            <div className="pb-2">
                <div className="pb-1">
                    <label htmlFor="email" className="text-sm font-semibold">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="border-neutral-1/40 w-full rounded-lg border px-4 py-1"
                        autoComplete="off"
                    />
                </div>

                {state?.errors?.email && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.email[0]}
                    </p>
                )}
            </div>

            <div className="pb-8">
                <div className="pb-1">
                    <label htmlFor="password" className="text-sm font-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="border-neutral-1/40 w-full rounded-lg border px-4 py-1"
                    />
                </div>

                {state?.errors?.password && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.password[0]}
                    </p>
                )}
            </div>

            <SignupButton />

            <p className="mt-2">
                Already have an account? <Link href="/login">Login</Link>
            </p>
        </form>
    );
}

function SignupButton() {
    const { pending } = useFormStatus();

    return (
        <button
            aria-disabled={pending}
            className={clsx(
                "w-full rounded-lg bg-green-500 px-4 py-3 text-sm font-medium text-white",
                { "cursor-not-allowed": pending }
            )}
        >
            {pending ? "Loading..." : "Sign up"}
        </button>
    );
}
