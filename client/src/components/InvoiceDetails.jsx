/* react-icons */
import { RxCross1 } from "react-icons/rx";
import { BsFillBoxFill } from "react-icons/bs";

export default function InvoiceDetails({ invoiceDetails, handleShowModal }) {
  return (
    <div className="fixed max-w-3xl mx-auto h-5/6 bg-white shadow-lg rounded-lg overflow-y-scroll top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <div className="flex items-center justify-between py-4 px-6 border-b border-slate-500">
        <div className="flex items-center gap-2">
          <BsFillBoxFill className="w-6 h-6 block" />
          <h2 className="font-medium">New Inventory</h2>
        </div>
        <RxCross1 className="cursor-pointer" onClick={handleShowModal} />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <p>{invoiceDetails.businessName}</p>
          <p>{invoiceDetails.businessAddress}</p>
          <p>{invoiceDetails.businessPhoneNumber}</p>
          <p>{invoiceDetails.businessEmailAddress}</p>
        </div>

        <div className="mb-4">
          <h2>Invoice</h2>
          <p>Invoice Number: {invoiceDetails.invoiceNumber}</p>
          <p>Date: {invoiceDetails.date}</p>
        </div>

        <div className="mb-4">
          <h2>Bill to</h2>
          <p>{invoiceDetails.customerName}</p>
          <p>{invoiceDetails.customerAddress}</p>
          <p>{invoiceDetails.customerPhoneNumber}</p>
          <p>{invoiceDetails.customerEmailAddress}</p>
        </div>

        <table className="mb-4 border-collapse table-auto w-full text-xs">
          <thead>
            <tr className=" uppercase font-medium text-left border-y border-slate-500">
              <th className="p-2">item name</th>
              <th className="p-2">quantity</th>
              <th className="p-2">unit price </th>
              <th className="p-2">total</th>
            </tr>
          </thead>

          <tbody>
            <tr className="capitalize font-medium border-b border-slate-500">
              <td className="p-2">{invoiceDetails.productName}</td>
              <td className="p-2">{invoiceDetails.productQuantity}</td>
              <td className="p-2">{invoiceDetails.productUnitPrice}</td>
              <td className="p-2">{invoiceDetails.productTotalPrice}</td>
            </tr>
          </tbody>
        </table>

        <div className="mb-4">
          <p>Subtotal: {invoiceDetails.subTotal}</p>
          <p>Discount: {invoiceDetails.discount}</p>
          <p>Tax: {invoiceDetails.tax}</p>
        </div>

        <div className="mb-4">
          <p>Grand total: {invoiceDetails.grandTotal}</p>
        </div>

        <div className="mb-4">
          <p>Balance Due: {invoiceDetails.balanceDue}</p>
        </div>

        <div className="mb-4">
          <h2>Payment terms:</h2>
          <p>Due Date: {invoiceDetails?.dueDate}</p>
          <p>Payment Method: {invoiceDetails.paymentMethod}</p>
        </div>

        <div>
          <h2>Thank your for your business!</h2>
          <p>
            For any inquiries, please contact us at [Your Company Phone Number]
            or [Your Company Email Address
          </p>
        </div>
      </div>
      ;
    </div>
  );
}
