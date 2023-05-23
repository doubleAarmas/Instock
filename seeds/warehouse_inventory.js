// import seed data files, arrays of objects
const inventoryData = require("../seed_data/inventories");
const warehouseData = require("../seed_data/warehouses");

exports.seed = function (knex) {
  return knex("warehouses")
    .del()
    .then(function () {
      return knex("warehouses").insert(warehouseData);
    })
    .then(() => {
      return knex("inventories").del();
    })
    .then(() => {
      return knex("inventories").insert(inventoryData);
    });
};
