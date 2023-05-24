import { useState } from "react";
import axios from "@/pages/api/axios";

export default function AddProduct() {
  const [productInfo, setProductInfo] = useState({
    productname: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "/product",
        JSON.stringify(productInfo),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setProductInfo({
        productname: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProductInfo((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  return (
    <section className="w-full">
      <h1 className="text-center font-bold text-2xl mt-4 mb-12">
        Add your product here
      </h1>
      <div className="max-w-3xl mx-auto px-6 mt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="productImage">Product Image:</label>
            <input type="file" id="productImage" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="productname">Product Name:</label>
            <input
              type="text"
              id="productname"
              name="productname"
              className="input-style"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category">Product Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              className="input-style"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price">Product Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              className="input-style"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="quantity">Product Quantity:</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              className="input-style"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col">
            <label>Product Description:</label>
            <textarea
              name="description"
              className="input-style"
              onChange={handleChange}
              autoComplete="off"
            ></textarea>
          </div>

          <button className="w-full py-3 bg-green-500 text-white font-medium text-sm rounded-xl">
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
}
