import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import Status from "@/app/ui/invoices/status";
import { getInvoices } from "@/app/lib/data";
import Link from "next/link";
import { parseDate } from "@/app/lib/utils";

export default async function InvoiceTalbe() {
    const response = await getInvoices();
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
                                    Amount
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
                                >
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
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
                            {response.map((invoiceTable) => {
                                return (
                                    <tr
                                        key={invoiceTable.id}
                                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                    >
                                        <td className="whitespace-nowrap px-3 py-3">
                                            <Link
                                                href={`/dashboard/invoices/${invoiceTable.id}/details`}
                                                className="underline-offset-2 transition-all duration-200 ease-in hover:text-blue-600 hover:underline"
                                            >
                                                {invoiceTable.name}
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            <Link
                                                href={`/dashboard/invoices/${invoiceTable.id}/details`}
                                                className="underline-offset-2 transition-all duration-200 ease-in hover:text-blue-600 hover:underline"
                                            >
                                                {invoiceTable.email}
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {invoiceTable.total_price}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {parseDate(invoiceTable.date)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            <Status
                                                status={invoiceTable.status}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex justify-end gap-3">
                                                <UpdateInvoice
                                                    invoiceId={invoiceTable.id}
                                                />
                                                <DeleteInvoice
                                                    invoiceId={invoiceTable.id}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
