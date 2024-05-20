"use client";
import { ChangePasswordState, changePassword } from "@/app/lib/actions";
import { Button } from "@/app/ui/buttons";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";

export default function ChangePasswordForm() {
    const initialState = {} as ChangePasswordState;
    const [state, dispatch] = useFormState(changePassword, initialState);

    return (
        <form action={dispatch}>
            <div className="mb-4">
                <label
                    htmlFor="oldPassword"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter old password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        placeholder="Enter old password"
                    />
                    <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
                {state?.errors?.oldPassword && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.oldPassword[0]}
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-medium"
                >
                    Enter new password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        placeholder="Enter new password"
                    />
                    <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
                {state?.errors?.newPassword && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.newPassword[0]}
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label
                    htmlFor="reEnterPassword"
                    className="mb-2 block text-sm font-medium"
                >
                    Re-Enter password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        id="reEnterPassword"
                        name="reEnterPassword"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        placeholder="Re enter password"
                    />
                    <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
                {state?.errors?.reEnterPassword && (
                    <p className="text-sm font-medium text-red-500">
                        {state?.errors?.reEnterPassword[0]}
                    </p>
                )}
            </div>

            <div className="mt-6">
                <Button type="submit">Update Profile</Button>
            </div>
        </form>
    );
}
