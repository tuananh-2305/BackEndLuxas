const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    importDate: { type: String, required: true },
    importNo_VatNo: { type: String, required: true },
    luxasCode: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    partName: { type: String, required: true },
    model: { type: String, required: true },
    supplies: { type: String, required: true },
    suppliesAddress: { type: String, required: true },
    maker: { type: String, required: true },
    shCode: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    size: { type: String, required: true },
    importTax: { type: String, required: true },
    vatImport: { type: String, required: true },
    feeShipping: { type: Number, required: true },
    costomsService: { type: Number, required: true },
    fines: { type: String },
    totalFee: { type: Number, required: true },
    description: { type: String },
    stockLocal: { type: String, required: true },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
