import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import WarehouseInventoryItem from "../WarehouseInventoryItem/WarehouseInventoryItem";
import axios from "axios";
import sortIcon from "../../assets/icons/sort-24px.svg";
import "../WarehouseInventoryItem/WarehouseInventoryItem.scss";

function WarehouseInventoryList() {
  const [inventoryData, setInventoryData] = useState([]);
  const { warehouseId } = useParams();
  useEffect(() => {
    const fetchInventoryData = async () => {
      const response = await axios.get(
        `http://localhost:5051/warehouses/${warehouseId}/inventory`
      );
      setInventoryData(response.data);
    };
    fetchInventoryData();
  }, [warehouseId]);
  return (
    <>
      {/* <Header /> */}
      <div className="inventory__list--area-container">
        <div className="warehouse-detail__infos-panel--nav ">
          <h3 className="warehouse-detail__info-title ">
            INVENTORY ITEM
            <img
              className="warehouse-detail__info-title-icon "
              src={sortIcon}
              alt="sort icon"
            />
          </h3>
          <h3 className="warehouse-detail__info-title ">
            CATEGORY
            <img
              className="warehouse-detail__info-title-icon "
              src={sortIcon}
              alt="sort icon"
            />
          </h3>
          <h3 className="warehouse-detail__info-title status">
            STATUS
            <img
              className="warehouse-detail__info-title-icon "
              src={sortIcon}
              alt="sort icon"
            />
          </h3>
          <h3 className="warehouse-detail__info-title ">
            QUANTITY
            <img
              className="warehouse-detail__info-title-icon "
              src={sortIcon}
              alt="sort icon"
            />
          </h3>
          <h3 className="warehouse-detail__info-title ">ACTIONS </h3>
        </div>
        {inventoryData.map((item) => (
          <WarehouseInventoryItem
            key={item.id}
            item_id={item.id}
            item_name={item.item_name}
            category={item.category}
            status={item.status}
            quantity={item.quantity}
            warehouse_id={item.warehouse_id}
          />
        ))}
      </div>
    </>
  );
}

export default WarehouseInventoryList;
