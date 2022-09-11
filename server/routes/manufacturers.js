const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const db = require("../models");

const deepPopulate = require("mongoose-deep-populate")(mongoose);

router.get("/manufacturers", async (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
  db.Manufacturer.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Manufacturers.",
      });
    });
});

router.post("/manufacturers/create", async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }
  const manufacturer = new db.Manufacturer({
    name: req.body.name,
    contact: req.body.contact,
    location: req.body.location,
  });

  manufacturer
    .save(manufacturer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the manufacturer.",
      });
    });
});

router.get("/manufacturer/:id", async (req, res) => {
  const id = req.params.id;
  db.Manufacturer.findById(id)
    .deepPopulate("retailers.invoice")
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Manufacturer with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Manufacturer with id=" + id });
    });
});
router.get("/manufacturer/:id/retailers", async (req, res) => {
  const id = req.params.id;
  db.Invoice.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$retailerId",
        unitPurchases: { $sum: "$unitPurchases" },
        totalValue: { $sum: "$totalValue" },
        amountPaid: { $sum: "$amountPaid" },
        accountBalance: { $sum: "$accountBalance" },
      },
    },
  ])
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Manufacturer with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Manufacturer with id=" + id });
    });
});

module.exports = router;
