const express = require("express");
const app = express();
const PORT = process.env.PORT || 5051;
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const warehouseRoutes = require("./routes/warehouseRoute");
const inventoryRoutes = require("./routes/inventoryRoute");

app.use("/", express.static("public/images"));

app.use("/warehouses", warehouseRoutes);

app.use("/inventory", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
