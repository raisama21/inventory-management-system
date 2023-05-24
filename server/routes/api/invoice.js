const express = require("express");
const router = express.Router();

const invoiceController = require("../../controllers/invoiceControllers");

router.post("/create_invoice", invoiceController.createInvoice);

router.get("/", invoiceController.getInvoice);

router.get("/details/:invoiceId", invoiceController.getInvoiceDetails);

module.exports = router;
