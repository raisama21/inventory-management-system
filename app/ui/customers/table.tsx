import { UpdateCustomer, DeleteCustomer } from "@/app/ui/customers/buttons";
import { getCustomers } from "@/app/lib/data";

export default async function CustomerTable() {
    const response = await getCustomers();
    if (!response) {
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
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
                                >
                                    Phone Number
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
                            {response.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {customer.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {customer.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {customer.phone_number}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateCustomer
                                                customerId={customer.id}
                                            />
                                            <DeleteCustomer
                                                customerId={customer.id}
                                            />
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
