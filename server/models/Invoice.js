const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);

const Invoice = mongoose.model(
  "Invoice",
  new mongoose.Schema({
    manufacturerId: String,
    retailerId: String,
    unitPurchases: Number,
    totalValue: Number,
    amountPaid: Number,
    accountBalance: Number,
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
    },
  }).plugin(deepPopulate)
);

module.exports = Invoice;
