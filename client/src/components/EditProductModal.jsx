import { useState } from "react";
import axios from "@/pages/api/axios";

export default function EditProductModal({ editId, setShowEditModal }) {
  const [productInfo, setProductInfo] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `/product/${editId}`,
        JSON.stringify(productInfo),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setProductInfo({});
    } catch (error) {
      console.log(error);
    }
  };

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
    <section className="min-w-[30rem] py-6 fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-black/80 text-white rounded-xl">
      <h2 className="text-center font-bold text-2xl mb-12">
        Edit your product here
      </h2>

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
              className="input-style text-black"
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
              className="input-style text-black"
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
              className="input-style text-black"
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
              className="input-style text-black"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col mb-8">
            <label>Product Description:</label>
            <textarea
              name="description"
              className="input-style text-black"
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
