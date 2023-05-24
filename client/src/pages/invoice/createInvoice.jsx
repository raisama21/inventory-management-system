import { useState } from "react";
import axios from "@/pages/api/axios";

export default function CreateInvoice() {
  const [invoiceData, setInvoiceData] = useState({
    businessName: "",
    businessAddress: "",
    businessPhoneNumber: "",
    businessEmailAddress: "",
    businessWebsite: "",
    invoiceNumber: "",
    date: "",
    customerName: "",
    customerAddress: "",
    customerPhoneNumber: "",
    customerEmailAddress: "",
    productName: "",
    productDescription: "",
    productQuantity: "",
    productUnitPrice: "",
    productTotalPrice: "",
    subTotal: "",
    discount: "",
    tax: "",
    grandTotal: "",
    balanceDue: "",
    dueDate: "",
    paymentMethod: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setInvoiceData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function postInvoiceData(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "/invoice/create_invoice",
        JSON.stringify(invoiceData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error?.response);
    }
  }

  return (
    <section className="w-full py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-12 font-semibold text-xl text-center">
          Create Invoice
        </h1>

        <form onSubmit={postInvoiceData}>
          <div className="mb-6">
            <input
              type="text"
              name="businessName"
              placeholder="business name"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.businessName}
              autoComplete="off"
            />
            <input
              type="text"
              name="businessAddress"
              placeholder="business address"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.businessAddress}
            />
            <input
              type="email"
              name="businessEmailAddress"
              placeholder="business email address"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.businessEmailAddress}
            />
            <input
              type="text"
              name="businessPhoneNumber"
              placeholder="business phone number"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.businessPhoneNumber}
            />
            <input
              type="text"
              name="businessWebsite"
              placeholder="business website"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.businessWebsite}
            />
            <input
              type="text"
              name="invoiceNumber"
              placeholder="invoice number"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.invoiceNumber}
            />
            <input
              type="text"
              name="date"
              placeholder="date"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.date}
            />
            <input
              type="text"
              name="customerName"
              placeholder="customer name"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.customerName}
            />
            <input
              type="text"
              name="customerAddress"
              placeholder="customer address"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.customerAddress}
            />
            <input
              type="email"
              name="customerEmailAddress"
              placeholder="customer email address"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.customerEmailAddress}
            />
            <input
              type="text"
              name="customerPhoneNumber"
              placeholder="customer phone number"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.customerPhoneNumber}
            />
            <input
              type="text"
              name="productName"
              placeholder="product name"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.productName}
            />
            <input
              type="number"
              name="productQuantity"
              placeholder="product quantity"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.productQuantity}
            />
            <input
              type="number"
              name="productUnitPrice"
              placeholder="product unit price"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.productUnitPrice}
            />
            <input
              type="number"
              name="productTotalPrice"
              placeholder="product total price"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.productTotalPrice}
            />
            <input
              type="text"
              name="productDescription"
              placeholder="product description"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.productDescription}
            />
            <input
              type="number"
              name="subTotal"
              placeholder="sub total"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.subTotal}
            />
            <input
              type="number"
              name="discount"
              placeholder="discount"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.discount}
            />
            <input
              type="number"
              name="tax"
              placeholder="tax"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.tax}
            />
            <input
              type="number"
              name="grandTotal"
              placeholder="grand total"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.grandTotal}
            />
            <input
              type="number"
              name="balanceDue"
              placeholder="balance due"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.balanceDue}
            />
            <input
              type="text"
              name="dueDate"
              placeholder="due date"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.dueDate}
            />
            <input
              type="text"
              name="paymentMethod"
              placeholder="payment method"
              className="input-style "
              onChange={handleChange}
              value={invoiceData.paymentMethod}
            />
          </div>
          <button className="w-full py-2 font-medium bg-gray-400 rounded-lg">
            create
          </button>
        </form>
      </div>
    </section>
  );
}
