const Invoice = require("../model/Invoice");

async function createInvoice(req, res) {
  try {
    const result = await Invoice.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function getInvoice(req, res) {
  try {
    const result = await Invoice.find();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function getInvoiceDetails(req, res) {
  try {
    const result = await Invoice.findOne({ _id: req?.params?.invoiceId });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function updateInvoiceById(req, res) {
  try {
    /*  */
  } catch (error) {
    console.log(error);
  }
}

async function deleteInvoiceById(req, res) {
  try {
    /*  */
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createInvoice,
  getInvoice,
  getInvoiceDetails,
  updateInvoiceById,
  deleteInvoiceById,
};
