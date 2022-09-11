const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);

const Retailer = mongoose.model(
  "Retailer",
  new mongoose.Schema({
    name: String,
    manufacturers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manufacturer",
      },
    ],
    invoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],
  }).plugin(deepPopulate)
);

module.exports = Retailer;
