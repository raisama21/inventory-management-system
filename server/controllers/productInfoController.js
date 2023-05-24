const ProductInfo = require("../model/ProductInfo");

async function getAllProductInfo(req, res) {
  try {
    const result = await ProductInfo.find({}, { description: 0 });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function createProductInfo(req, res) {
  try {
    const result = await ProductInfo.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function updateProductInfo(req, res) {
  try {
    const result = await ProductInfo.findByIdAndUpdate(req?.params?.id, {
      $set: req?.body,
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function deleteProductInfo(req, res) {
  try {
    const result = await ProductInfo.findByIdAndDelete(req?.params?.id);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
}

const getProductDetailsById = async (req, res) => {
  try {
    const result = await ProductInfo.findOne({ _id: req?.params?.pid });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

async function getAllPrice(req, res) {
  try {
    const result = await ProductInfo.find(
      {},
      { _id: 0, price: 1, quantity: 1 }
    );

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllProductInfo,
  createProductInfo,
  updateProductInfo,
  deleteProductInfo,
  getProductDetailsById,
  getAllPrice,
};
