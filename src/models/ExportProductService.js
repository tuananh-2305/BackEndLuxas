const mongoose = require("mongoose");

const exportProductSchema = new mongoose.Schema(
  {
    implementer: { type: String, required: true },
    image: { type: String, required: true },
    luxasCode: { type: String, required: true, unique: true },
    partName: { type: String, required: true, unique: true },
    model: { type: String, required: true, unique: true },
    shCode: { type: Number, required: true, unique: true },
    saleForCompany: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    customerSevice: { type: Number, required: true },
    vat: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    commission: { type: Number, required: true },
    feesIncurred: { type: Number, required: true },
    profit: { type: Number, required: true },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

const ExportProduct = mongoose.model("ExportProduct", exportProductSchema);
module.exports = ExportProduct;
