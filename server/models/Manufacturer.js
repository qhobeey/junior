const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);

const Manufacturer = mongoose.model(
  "Manufacturer",
  new mongoose.Schema({
    name: String,
    location: String,
    contact: String,
    retailers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Retailer",
      },
    ],
  })
    .method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    })
    .plugin(deepPopulate)
);

module.exports = Manufacturer;
