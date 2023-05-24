import { useState, useEffect } from "react";
import axios from "@/pages/api/axios";

import InvoiceDetails from "@/components/InvoiceDetails";

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal((prevData) => !prevData);
  }

  async function getInvoiceDetailsData(event) {
    const { id } = event.target.dataset;

    try {
      const response = await axios.get(`/invoice/details/${id}`);

      if (response.status === 200) {
        setInvoiceDetails(response.data);

        handleShowModal();
      }
    } catch (error) {
      console.log(error?.response);
    }
  }

  async function getInvoiceData() {
    try {
      const response = await axios.get("/invoice");

      const data = response.data;
      setInvoices(data);
    } catch (error) {
      console.log(error?.response);
    }
  }

  useEffect(() => {
    getInvoiceData();
  }, []);

  return (
    <section className="w-full">
      <div className="mx-6 mt-4">
        <table className="border-collapse table-auto w-full text-sm">
          <thead>
            <tr className="uppercase font-medium text-left border-b border-slate-500">
              <th className="p-2">date</th>
              <th>invoice</th>
              <th>customer name</th>
              <th>due date</th>
              <th>amount</th>
              <th>balance due</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => {
              return (
                <tr
                  key={invoice?._id}
                  className="capitalize font-medium border-b border-slate-500"
                >
                  <td className="p-2">{invoice?.date}</td>
                  <td>{invoice?.invoiceNumber}</td>
                  <td
                    onClick={getInvoiceDetailsData}
                    data-id={invoice._id}
                    className="cursor-pointer"
                  >
                    {invoice?.customerName}
                  </td>
                  <td>{invoice?.dueDate}</td>
                  <td>{invoice?.grandTotal}</td>
                  <td>{invoice?.balanceDue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <InvoiceDetails
          invoiceDetails={invoiceDetails}
          handleShowModal={handleShowModal}
        />
      )}
    </section>
  );
}
