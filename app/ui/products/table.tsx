import { getProducts } from "@/app/lib/data";
import { UpdateProduct, DeleteProduct } from "@/app/ui/products/buttons";
import Status from "@/app/ui/products/status";
import Link from "next/link";

export default async function ProductTable() {
    const products = await getProducts();
    if (!products) {
        return;
    }

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
                                >
                                    Product Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Category
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Price
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Quantity
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="relative py-3 pl-6 pr-3"
                                >
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <Link
                                            href={`/dashboard/products/${product.id}/details`}
                                            className="underline-offset-2 transition-all duration-200 ease-in hover:text-blue-600 hover:underline"
                                        >
                                            {product.product_name}
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {product.category}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {product.price}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {product.quantity}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <Status status={product.status} />
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateProduct id={product.id} />
                                            <DeleteProduct id={product.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
