"use client";

import Link from "next/link";
import { LoginState, authentication } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";
import { redirect } from "next/navigation";

export default function LoginForm() {
    const initialState = {} as LoginState;
    const [state, dispatch] = useFormState(authentication, initialState);

    if (state?.user?.id) {
        redirect("/dashboard");
    }

    return (
        <form action={dispatch}>
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

            <LoginButton />

            <p className="mt-2">
                Dont' have an account? <Link href="/signup">Signup</Link>
            </p>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            aria-disabled={pending}
            className={clsx(
                "w-full rounded-lg bg-green-500 px-4 py-3 text-sm font-medium text-white",
                { "cursor-not-allowed": pending }
            )}
        >
            {pending ? "Loading..." : "login"}
        </button>
    );
}
