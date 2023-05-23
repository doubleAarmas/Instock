import "./Warehouses.scss";
import Warehouse from "../../components/Warehouse/Warehouse";
import WarehouseInventoryListHeader from "../../components/WarehouseInventoryListHeader/WarehouseInventoryListHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { ReactComponent as Sort } from "../../assets/icons/sort-24px.svg";

function Warehouses() {
  const apiURL = "http://localhost:5051/warehouses";
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    axios.get(apiURL).then((response) => {
      setWarehouses(response.data);
    });
  }, []);

  return (
    <section className="warehouses">
      <WarehouseInventoryListHeader
        title="Warehouses"
        text="Warehouse"
        link="/warehouses/add"
      />
      <div className="sortSubheader">
        <div className="sortSubheader__warehouse container">
          <p className="sortLabel">WAREHOUSE</p>
          <Sort />
        </div>
        <div className="sortSubheader__address container">
          <p className="sortLabel">ADDRESS</p>
          <Sort />
        </div>
        <div className="sortSubheader__contname container">
          <p className="sortLabel">CONTACT NAME</p>
          <Sort />
        </div>
        <div className="sortSubheader__continfo container">
          <p className="sortLabel">CONTACT INFORMATION</p>
          <Sort />
        </div>
        <div className="sortSubheader__actions container">
          <p className="sortLabel">ACTIONS</p>
        </div>
      </div>
      <div className="warehouses_list">
        {warehouses.map((warehouse) => (
          <Warehouse key={warehouse.id} warehouse={warehouse} />
        ))}
      </div>
    </section>
  );
}

export default Warehouses;
