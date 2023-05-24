import { useLoaderData } from "react-router-dom";

export default function ProductDetails() {
  const details = useLoaderData();

  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl text-center mb-4">Product Details</h1>
      <h2 className="font-medium text-xl text-center">
        Product Availability: In Stock
      </h2>

      <div className="max-w-4xl mx-auto mt-8 mb-12 flex items-start gap-6">
        <div className="w-2/4 py-8 px-6 mx-auto shadow-xl border border-x-black/10 rounded-2xl">
          <h3 className="mb-4 text-xl font-medium">{details.productname}</h3>
          <p>SKU: 4548736110896</p>
          <p>Category: {details.category}</p>
          <p>Quantity in stock: {details.quantity}</p>
          <p className="mt-4 mb-4">{details.description}</p>
          <p className="text-right">Price: ${details.price}</p>
        </div>

        <div className="w-2/4 h-full">
          <img
            src="https://images.unsplash.com/photo-1576082712237-eb1335ce23a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
            alt="Sony WH-1000XM4 Wireless Noise Cancelling Headphones"
            className="h-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export async function ProductDetailsLoader({ params }) {
  const { pid } = params;
  const response = await fetch(
    `http://localhost:3000/api/product/details/${pid}`
  );

  if (!response.ok) {
    throw Error("Could not fetch Product Details Page");
  }

  return await response.json();
}
