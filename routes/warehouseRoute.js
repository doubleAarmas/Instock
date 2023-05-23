const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

router
  .route("/")
  .get(warehouseController.index)
  .post(warehouseController.addWarehouse);

//allows the user to request just a single warehouse by using the function inside of the warehouse controller file
router.route("/:id")
  .get(warehouseController.singleWarehouse)
  .put(warehouseController.updateWarehouse);

router.route("/:id/inventory").get(warehouseController.warehouseInventory);

router.route('/:id').delete(warehouseController.deleteWarehouse);

router.route("/:id/inventory").delete(warehouseController.deleteWarehouseInventory);

module.exports = router;
