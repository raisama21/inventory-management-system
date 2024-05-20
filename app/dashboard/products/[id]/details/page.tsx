import { getProductDetails } from "@/app/lib/data";

export default async function Details({ params }: { params: { id: string } }) {
    const { id } = params;
    const details = await getProductDetails(id);
    if (!details) {
        return;
    }

    return (
        <main className="w-full">
            <h1 className="mb-4 text-center text-2xl font-bold">
                Product Details
            </h1>
            <h2 className="text-center text-xl font-medium">
                Product Availability:{" "}
                <span className="capitalize">{details?.status}</span>
            </h2>

            <div className="mx-auto mb-12 mt-8 flex max-w-4xl items-start gap-6">
                <div className="mx-auto w-2/4 rounded-2xl border border-x-black/10 px-6 py-8 shadow-xl">
                    <h3 className="mb-4 text-xl font-medium capitalize">
                        {details?.product_name}
                    </h3>
                    <p>Category: {details?.category}</p>
                    <p>Quantity in stock: {details?.quantity}</p>
                    <p className="mb-4 mt-4">{details?.description}</p>
                    <p className="text-right">Price: Rs {details?.price}</p>
                </div>

                <div className="h-full w-2/4">
                    <img
                        src={details.image_url}
                        className="h-full rounded-2xl"
                    />
                </div>
            </div>
        </main>
    );
}
