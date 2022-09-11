require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const manufacturerRoutes = require("./routes/manufacturers");
const retailerRoutes = require("./routes/retailers");
const invoicesRoutes = require("./routes/invoices");
const cors = require("cors");
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api", [manufacturerRoutes, retailerRoutes, invoicesRoutes]);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
