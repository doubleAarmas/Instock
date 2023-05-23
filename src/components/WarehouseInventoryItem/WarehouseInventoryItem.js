import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./WarehouseInventoryItem.scss";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import InventoryModal from "../../components/InventoryModal/InventoryModal";
import axios from "axios";

function WarehouseInventoryItem({
  item_id,
  item_name,
  category,
  status,
  quantity,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    axios.delete(`http://localhost:5051/inventory/${item_id}`).then((res) => {
      console.log(res.data);
      setIsOpen(false);
      window.location.reload();
    });
  };

  return (
    <div className="warehouse-detail__card">
      <div className="warehouse-detail__info-products">
        <span className="warehouse-detail__info-detail-products">
          <Link to={`/inventory/${item_id}`} className="publish__link">
            <p className="warehouse-detail__info-detail-color">{item_name} </p>
          </Link>
          <img
            className="warehouse-detail__info-detail-icon--size"
            src={chevronIcon}
            alt="arrow icon"
          />
        </span>
        <div className="warehouse-detail__info-detail-type">
          <p className="warehouse-detail__info-detail">{category}</p>
        </div>
        <div className="warehouse-detail__info-detail-instock">
          <button
            className={
              status === "In Stock"
                ? "warehouse-detail__info-detail in-stock"
                : "warehouse-detail__info-detail out-of-stock"
            }
          >
            {status === "In Stock" ? "IN STOCK" : "OUT OF STOCK"}
          </button>
        </div>
        <div className="warehouse-detail__info-detail-quantity">
          <p className="warehouse-detail__info-detail quantity">{quantity}</p>
        </div>
        <img
          className="warehouse-detail__info-icons--size"
          src={deleteIcon}
          alt="delete icon"
          onClick={() => setIsOpen(true)}
        />
        <Link to={`/inventory/${item_id}/edit`} className="warehouse-detail__info-icons--size">
          <img
            className="warehouse-detail__info-icons--size"
            src={editIcon}
            alt="edit icon"
          />
        </Link>
        {isOpen && (
          <InventoryModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
          ></InventoryModal>
        )}
      </div>
      <div className="warehouse-detail__infos-panels display ">
        <div className="warehouse-detail__infos-panel">
          <div className="warehouse-detail__info-item">
            <div className="warehouse-detail__info-item--margin inventory-list">
              <h3 className="warehouse-detail__info-title ">INVENTORY ITEM</h3>
              <span className="warehouse-detail__info-detail-display">
                <Link to={`/inventory/${item_id}`} className="publish__link">
                  <p className="warehouse-detail__info-detail-color">
                    {item_name}{" "}
                  </p>
                </Link>
                <img
                  className="warehouse-detail__info-detail-icon--size"
                  src={chevronIcon}
                  alt="arrow icon"
                />
              </span>
            </div>
            <div className="warehouse-detail__info-item--margin category">
              <h3 className="warehouse-detail__info-title ">CATEGORY</h3>
              <p className="warehouse-detail__info-detail">{category}</p>
            </div>
          </div>
          <div className="warehouse-detail__info-item">
            <div className="warehouse-detail__info-item--margin status">
              <h3 className="warehouse-detail__info-title ">STATUS</h3>
              <button
                className={
                  status === "In Stock"
                    ? "warehouse-detail__info-detail in-stock"
                    : "warehouse-detail__info-detail out-of-stock"
                }
              >
                {status === "In Stock" ? "IN STOCK" : "OUT OF STOCK"}
              </button>
            </div>
            <div className="warehouse-detail__info-item--margin quantity">
              <h3 className="warehouse-detail__info-title ">QTY</h3>
              <p className="warehouse-detail__info-detail quantity">
                {quantity}
              </p>
            </div>
          </div>
        </div>
        <div className="warehouse-detail__info-icons">
          <img
            className="warehouse-detail__info-icons--size"
            src={deleteIcon}
            alt="delete icon"
            onClick={() => setIsOpen(true)}
          />
          <img
            className="warehouse-detail__info-icons--size"
            src={editIcon}
            alt="edit icon"
          />
          {isOpen && (
            <InventoryModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              handler={handleDelete}
              item_name={item_name}
            ></InventoryModal>
          )}
        </div>
      </div>
    </div>
  );
}

export default WarehouseInventoryItem;
