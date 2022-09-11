const router = require("express").Router();
const db = require("../models");

router.post("/invoices/create", async (req, res) => {
  const invoice = new db.Invoice({
    manufacturerId: req.body.manufacturerId,
    retailerId: req.body.retailerId,
    unitPurchases: req.body.unitPurchases,
    totalValue: req.body.totalValue,
    amountPaid: req.body.amountPaid,
    accountBalance: req.body.accountBalance,
  });

  invoice
    .save(invoice)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the invoice.",
      });
    });
});

// router.get("/retailer/:id", async (req, res) => {
//   const id = req.params.id;
//   db.Manufacturer.findById(id)
//     .then((data) => {
//       if (!data)
//         res
//           .status(404)
//           .send({ message: "Not found Manufacturer with id " + id });
//       else res.send(data);
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Manufacturer with id=" + id });
//     });
// });

module.exports = router;
