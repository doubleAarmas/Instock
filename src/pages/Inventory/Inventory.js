import "./Inventory.scss";
import InventoryItem from "../../components/InventoryItem/InventoryItem";
import WarehouseInventoryListHeader from "../../components/WarehouseInventoryListHeader/WarehouseInventoryListHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { ReactComponent as Sort } from "../../assets/icons/sort-24px.svg";

function Inventory() {
  const apiURL = "http://localhost:5051/inventory";
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get(apiURL).then((response) => {
      setInventory(response.data);
    });
  }, []);

  return (
    <div className="inventory">
      <WarehouseInventoryListHeader
        title="Inventory"
        text="Item"
        link="/inventory/add"
      />
      <div className="inventory-SortSubheader">
        <div className="inventory-SortSubheader__item container">
          <p className="sortLabel">INVENTORY ITEM</p>
          <Sort />
        </div>
        <div className="inventory-SortSubheader__category container">
          <p className="sortLabel">CATEGORY</p>
          <Sort />
        </div>
        <div className="inventory-SortSubheader__status container">
          <p className="sortLabel">STATUS</p>
          <Sort />
        </div>
        <div className="inventory-SortSubheader__quantity container">
          <p className="sortLabel">QTY</p>
          <Sort />
        </div>
        <div className="inventory-SortSubheader__warehouse container">
          <p className="sortLabel">WAREHOUSE</p>
          <Sort />
        </div>
        <div className="inventory-SortSubheader__actions container">
          <p className="sortLabel">ACTIONS</p>
        </div>
      </div>
      <div className="inventory_list">
        {inventory.map((item) => (
          <InventoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
export default Inventory;
