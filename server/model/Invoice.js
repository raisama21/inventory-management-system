const { Schema, default: mongoose } = require("mongoose");

const InvoiceSchema = new Schema(
  {
    businessName: {
      type: String,
      require: true,
    },
    businessAddress: {
      type: String,
      require: true,
    },
    businessPhoneNumber: {
      type: String,
      require: true,
    },
    businessEmailAddress: {
      type: String,
      require: true,
    },
    businessWebsite: {
      type: String,
      require: true,
    },
    invoiceNumber: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    customerName: {
      type: String,
      require: true,
    },
    customerAddress: {
      type: String,
      require: true,
    },
    customerPhoneNumber: {
      type: String,
      require: true,
    },
    customerEmailAddress: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    productDescription: {
      type: String,
      require: true,
    },
    productQuantity: {
      type: Number,
      require: true,
    },
    productUnitPrice: {
      type: Number,
      require: true,
    },
    productTotalPrice: {
      type: Number,
      require: true,
    },
    subTotal: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
    tax: {
      type: Number,
      require: true,
    },
    grandTotal: {
      type: Number,
      require: true,
    },
    balanceDue: {
      type: Number,
    },
    dueDate: {
      type: String,
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    latePaymentFee: {
      type: String,
    },
    additionalInfomation: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
