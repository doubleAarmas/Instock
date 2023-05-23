const knex = require("knex")(require("../knexfile"));
const uuid = require("uuid");
const warehouses = require("../seed_data/warehouses");

exports.index = (_req, res) => {
  knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "warehouses.id")
    .select(
      "inventories.id",
      "inventories.warehouse_id",
      "warehouses.warehouse_name",
      "inventories.item_name",
      "inventories.description",
      "inventories.category",
      "inventories.status",
      "inventories.quantity"
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving inventories: ${err}`)
    );
};

exports.singleInventoryItem = (req, res) => {
  knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "warehouses.id")
    .select(
      "inventories.id",
      "inventories.warehouse_id",
      "warehouses.warehouse_name",
      "inventories.item_name",
      "inventories.description",
      "inventories.category",
      "inventories.status",
      "inventories.quantity"
    )
    .where("inventories.id", req.params.id)
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }

      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error retrieving inventory item ${req.params.id}: ${err}`)
    );
};

exports.addInventoryItem = (req, res) => {
  const id = uuid.v4();
  const validWarehouseIds = warehouses.map((warehouse) => warehouse.id);
  if (
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity ||
    !req.body.warehouse_id
  ) {
    return res.status(400).send("Please make sure to fill all the fields");
  }
  if (isNaN(req.body.quantity)) {
    return res.status(400).send("Input entered is not a number");
  }
  if (!validWarehouseIds.includes(req.body.warehouse_id)) {
    return res.status(400).send("Warehouse ID entered is not valid");
  }

  req.body.id = id;
  knex("inventories")
    .insert(req.body)
    .then((data) => {
      const newInventoryURL = `/inventory/${data[0]}`;
      res.status(201).location(newInventoryURL).send(newInventoryURL);
    })
    .catch((err) =>
      res.status(400).send(`Error creating Inventory Item: ${err}`)
    );
};

exports.deleteInventoryItem = (req, res) => {
  knex("inventories")
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res
        .status(204)
        .send(`Inventory item with id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error deleting Inventory item ${req.params.id} ${err}`)
    );
};

exports.updateInventoryItem = (req, res) => {
  if (
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity ||
    !req.body.warehouse_id ||
    !req.body.warehouse_name
  ) {
    return res
      .status(400)
      .send("Please make sure to provide proper fields in a request");
  } else if (!req.params.id) {
    return res.status(404).send("Inventory ID not found");
  } else if (isNaN(req.body.quantity)) {
    return res.status(400).send("Quantity must be a number");
  }

  knex("inventories")
    .where({ id: req.params.id })
    .then((inventoryItem) => {
      if (inventoryItem.length === 0) {
        res.status(404).send("Inventory ID not found");
      } else if (req.body.warehouse_id !== inventoryItem[0].warehouse_id) {
        res.status(400).send("Warehouse ID not found");
      } else {
        return knex("inventories")
          .where({ id: req.params.id })
          .update({
            item_name: req.body.item_name,
            description: req.body.description,
            category: req.body.category,
            status: req.body.status,
            quantity: req.body.quantity,
            warehouse_id: req.body.warehouse_id,
          })
          .then(() => {
            res
              .status(200)
              .send(`Item with id: ${req.params.id} has been updated`);
          })
          .catch((err) =>
            res
              .status(400)
              .send(`Error updating Warehouse ${req.params.id} ${err}`)
          );
      }
    });
};
