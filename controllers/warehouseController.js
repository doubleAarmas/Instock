const knex = require("knex")(require("../knexfile"));
const uuid = require("uuid");

exports.index = (_req, res) => {
  knex("warehouses")
    // .select("warehouse_name", "address", "manager")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};
//providing the ability to add a new warehouse into our list of warehouses
exports.addWarehouse = (req, res) => {
  // Validate the request body for required data
  console.log(req.body);
  const id = uuid.v4();
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide warehouse_name, address, city, country, contact_name, contact_position, contact_phone and contact_email fields in a request"
      );
  }

  // Check if the provided email address is valid
  const emailValidation = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailValidation.test(req.body.contact_email)) {
    return res.status(400).send("Invalid email address");
  }

  // Check if the provided phone number is valid
  const phoneValidation = /^(\d{3}[-\s()]|\d{3})\d{3}[-\s()]?\d{4}$/;
  if (!phoneValidation.test(req.body.contact_phone)) {
    return res.status(400).send("Invalid phone number");
  }
  req.body.id = id;
  knex("warehouses")
    .insert({...req.body})
    .then((data) => {
      // For POST requests we need to respond with 201 and the location of the newly created record
      const newWarehouseURL = `/warehouses/${id}`;
      //in this case it's needed to set the response "Location" HTTP header, which is a standard for POST request response in REST API
      res.status(201).location(newWarehouseURL).send(newWarehouseURL);
    })
    .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};

exports.updateWarehouse = (req, res) => {
  const phoneRegex = /^(\+1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  const emailRegex = /[a-z0-9@.]+$/i;

  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email ||
    !phoneRegex.test(req.body.contact_phone.trim()) === true ||
    !emailRegex.test(req.body.contact_email.trim()) === true
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide proper warehouse_name, address, city, country, contact_name, contact_position, contact_phone and contact_email fields in a request"
      );
  }

  knex('warehouses')
    .where({ id: req.body.id })
    .update({
      warehouse_name: req.body.warehouse_name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      contact_name: req.body.contact_name,
      contact_position: req.body.contact_position,
      contact_phone: req.body.contact_phone,
      contact_email: req.body.contact_email,
    })
    .then(() => {
      res.status(200).send(`Warehouse with id: ${req.params.id} has been updated`);
    })
    .catch((err) =>
      res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`)
    );
};

//This controller method returns a single warehouse, building the SQL query SELECT * FROM warehouse WHERE id=#, where # is our parameter at req.params.id.
//function allowing the user to request just a single warehouse after the /
exports.singleWarehouse = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(404)
        .send(`Error retrieving Warehouse ${req.params.id}: ${err}`)
    );
};

exports.warehouseInventory = (req, res) => {
  knex("inventories")
    .where({ warehouse_id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving the inventory for Warehouse ${req.params.id} ${err}`
        )
    );
};

exports.deleteWarehouse = (req, res) => {
  knex('warehouses')
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res.status(204).send(`Warehouse with id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res.status(404).send(`Error deleting Warehouse ${req.params.id} ${err}`)
    );
};

exports.deleteWarehouseInventory = (req, res) => {
  knex('warehouses')
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res.status(204).send(`Warehouse with id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res.status(404).send(`Error deleting Warehouse ${req.params.id} ${err}`)
    );
};
