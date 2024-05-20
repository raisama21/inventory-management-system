import Link from "next/link";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteCategory } from "@/app/lib/actions";

export function AddCategories() {
    return (
        <Link
            href="/dashboard/products/categories/add"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Add Category</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateCategories({ name }: { name: string }) {
    return (
        <Link
            href={`/dashboard/products/categories/edit?name=${name}`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteCategories({ name }: { name: string }) {
    const deleteCategoryWithId = deleteCategory.bind(null, name);

    return (
        <form action={deleteCategoryWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}
