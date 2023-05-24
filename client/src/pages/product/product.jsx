import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "@/pages/api/axios";

import EditProduct from "@/components/EditProductModal";

/* rect icons */
import { FiSearch } from "react-icons/fi";
import { RiEditBoxLine, RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [response, setResponse] = useState({});

  async function getAllProduct() {
    try {
      const response = await axios.get("/product");

      const data = await response.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProduct();
  }, []);

  function handleEditModalState(event) {
    setShowEditModal((oldData) => !oldData);

    setEditId((oldData) => event.target.dataset.id);
  }

  function handleShow(event) {
    setShowDeleteConfirmation((oldData) => !oldData);
  }

  async function handleDeleteProduct(event) {
    const { pid } = event.target.dataset;

    try {
      const response = await axios.delete(`/product/${pid}`);

      setResponse(response);

      if (response.status === 204) {
        getAllProduct();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="relative w-full ">
      <div className="mx-6">
        <div className="flex items-start justify-between mt-4 mb-12">
          <h2 className="text-2xl font-medium">Inventory Items</h2>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or category"
              className="py-2 pl-12 border border-neutral-1 rounded-lg"
            />
            <FiSearch className="absolute block w-6 h-6 top-[22%] left-4" />
          </div>
        </div>

        <table className="w-full">
          <thead className="border-y-2 border-neutral-1/30">
            <tr>
              <th className="py-2">S/N</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Value</th>
              <th>action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {products.map((product) => {
              return (
                <tr
                  key={product._id}
                  className="border-b-2 border-neutral-1/30"
                >
                  <td className="py-2">{1}</td>
                  <td>
                    <Link
                      to={`details/${product._id}`}
                      className="hover:text-blue-400 hover:transition-colors hover:duration-100"
                    >
                      {product.productname}
                    </Link>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>
                    {!showDeleteConfirmation && (
                      <div>
                        <RiEditBoxLine
                          className="mr-2 inline cursor-pointer"
                          data-id={product._id}
                          onClick={handleEditModalState}
                        />
                        <RiDeleteBin6Line
                          className="inline cursor-pointer"
                          onClick={handleShow}
                        />
                      </div>
                    )}

                    {showDeleteConfirmation && (
                      <div>
                        <AiOutlineCheck
                          className="mr-2 inline cursor-pointer"
                          data-pid={product._id}
                          onClick={handleDeleteProduct}
                        />
                        <RxCross1
                          onClick={handleShow}
                          className="inline cursor-pointer"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <EditProduct editId={editId} setShowEditModal={setShowEditModal} />
      )}
    </section>
  );
}
