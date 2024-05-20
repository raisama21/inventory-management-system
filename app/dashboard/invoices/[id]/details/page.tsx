import { getInvoiceDetails } from "@/app/lib/data";
import { parseDate } from "@/app/lib/utils";

export default async function Details({
    params: { id },
}: {
    params: { id: string };
}) {
    const details = await getInvoiceDetails(id);
    if (!details) {
        return;
    }

    return (
        <>
            <div className="pb-4">
                <h2>product details:</h2>
                <div>name: {details.product_name}</div>
                <div>category: {details.category}</div>
                <div>price: {details.price}</div>
            </div>

            <div className="pb-4">
                <h2>customer details:</h2>
                <div>name: {details.name}</div>
                <div>email: {details.email}</div>
                <div>phone number: {details.phone_number}</div>
            </div>

            <div>
                <h2>invoice details:</h2>
                <div>quantity: {details.quantity}</div>
                <div>total price: {details.total_price}</div>
                <div>date: {parseDate(details.date)}</div>
                <div>status: {details.status}</div>
            </div>
        </>
    );
}
