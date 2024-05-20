import { UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/buttons";
import { getUserDetails } from "@/app/lib/data";
import { UpdateProductState, updateUser } from "@/app/lib/actions";
import Link from "next/link";

export default async function Profile() {
    const user = await getUserDetails();

    const initialState = {} as UpdateProductState;

    return (
        <main>
            <form action={updateUser}>
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="mb-2 block text-sm font-medium"
                    >
                        Enter username
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Enter username"
                            defaultValue={user?.username}
                        />
                        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium"
                    >
                        Enter email
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Enter email"
                            defaultValue={user?.email}
                        />
                        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                    <Button type="submit">Update Profile</Button>
                    <div>
                        <Link href="/dashboard/profile/change-password">
                            <Button type="button">Change Password</Button>
                        </Link>
                    </div>
                </div>
            </form>
        </main>
    );
}
