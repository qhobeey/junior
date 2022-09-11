const router = require("express").Router();
const db = require("../models");

router.get("/retailers", async (req, res) => {
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
          err.message || "Some error occurred while retrieving Retailers.",
      });
    });
});

router.post("/retailers/create", async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }
  const retailer = new db.Retailer({
    name: req.body.name,
    manufacturers: req.body.manufacturers,
    invoices: req.body.invoices,
  });

  retailer
    .save(retailer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the retailer.",
      });
    });
});

router.get("/retailer/:id", async (req, res) => {
  const id = req.params.id;
  db.Retailer.findById(id)
    .populate("invoices")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Retailer with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Retailer with id=" + id });
    });
});

module.exports = router;
