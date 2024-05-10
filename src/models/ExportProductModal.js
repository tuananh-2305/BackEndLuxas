const mongoose = require("mongoose");

const exportProductSchema = new mongoose.Schema(
  {
    implementer: { type: String, required: true },
    image: { type: String, required: true },
    exportDate: { type: String, required: true },
    exportCode: { type: String, required: true },
    partName: { type: String, required: true },
    model: { type: String, required: true },
    luxasCode: { type: String, required: true },
    exportCode: { type: String, required: true },
    shCode: { type: String, required: true },
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
    costImportUnit: { type: Number, required: true },
    salePriceUnit: { type: Number, required: true },
    totalExportFee: { type: Number, required: true },
    exportFeeVat: { type: Number, required: true },
    profitNoVat: { type: Number, required: true },
    profit: { type: Number, required: true },
    note: { type: String },
    document: [
      {
        documentFileName: { type: String, required: true },
        size: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ExportProduct = mongoose.model("ExportProduct", exportProductSchema);
module.exports = ExportProduct;
