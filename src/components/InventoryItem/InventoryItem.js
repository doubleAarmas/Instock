import "./InventoryItem.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Chevron } from "../../assets/icons/chevron_right-24px.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete_outline-24px.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit-24px.svg";
import InventoryModal from "../../components/InventoryModal/InventoryModal";
import axios from "axios";
import { useState } from "react";

function InventoryItem({ item }) {
  const { item_name, category, status, quantity, warehouse_name } = item;

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5051/inventory/${item.id}`)
      .then((res) => {
        console.log(res.data);
        setIsOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {/* This article is for the mobile resolution */}
      <article className="inventoryItem">
        <div className="inventoryItem-container0">
          <div className="inventoryItem-container1">
            <div className="inventoryItem-name">
              <p className="inventoryItem-name__label label">INVENTORY ITEM</p>
              <Link
                to={`/inventory/${item.id}`}
                className="inventoryItem-name__link"
              >
                <p className="inventoryItem-name__name">
                  {item_name}
                  <Chevron />
                </p>
              </Link>
            </div>
            <div className="inventoryItem-category">
              <p className="inventoryItem-category__label label">CATEGORY</p>
              <p className="inventoryItem-category__category">{category}</p>
            </div>
          </div>
          <div className="inventoryItem-container2">
            <div className="inventoryItem-status">
              <p className="inventoryItem-status__label label">STATUS</p>
              <div
                className={
                  status === "In Stock"
                    ? "inventoryItem-status__status in-stock"
                    : "inventoryItem-status__status out-of-stock"
                }
              >
                {status === "In Stock" ? "IN STOCK" : "OUT OF STOCK"}
              </div>
            </div>
            <div className="inventoryItem-quantity">
              <p className="inventoryItem-quantity__label label">QTY</p>
              <div className="inventoryItem-quantity__quantity">
                <p>{quantity}</p>
              </div>
            </div>
            <div>
              <p className="inventoryItem-warehouse__label label">WAREHOUSE</p>
              <p className="inventoryItem-warehouse__warehouse">
                {warehouse_name}
              </p>
            </div>
          </div>
        </div>
        <div className="inventoryItem-icons">
          <Delete onClick={() => setIsOpen(true)} />
          {isOpen && (
            <InventoryModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              handler={handleDelete}
              item_name={item_name}
            ></InventoryModal>
          )}
          <Link to={`/inventory/${item.id}/edit`}>
            <Edit />
          </Link>
        </div>
      </article>

      {/* This article is for the tablet and desktop resolutions */}
      <article className="tab-inventoryItem">
        <div className="tab-inventoryItem-container0">
          <div className="tab-inventoryItem-name">
            <Link
              to={`/inventory/${item.id}`}
              className="tab-inventoryItem-name__link"
            >
              <p className="tab-inventoryItem-name__name">
                {item_name}
                <Chevron />
              </p>
            </Link>
          </div>
          <div className="tab-inventoryItem-category">
            <p className="tab-inventoryItem-category__category">{category}</p>
          </div>
          <div className="tab-inventoryItem-status">
            <div
              className={
                status === "In Stock"
                  ? "tab-inventoryItem-status__status in-stock"
                  : "tab-inventoryItem-status__status out-of-stock"
              }
            >
              {status === "In Stock" ? "IN STOCK" : "OUT OF STOCK"}
            </div>
          </div>
          <div className="tab-inventoryItem-quantity">
            <div className="tab-inventoryItem-quantity__quantity">
              <p>{quantity}</p>
            </div>
          </div>
          <div className="tab-inventoryItem-warehouse">
            <p className="tab-inventoryItem-warehouse__warehouse">
              {warehouse_name}
            </p>
          </div>
          <div className="tab-inventoryItem-icons">
            <Delete onClick={() => setIsOpen(true)} />
            {isOpen && (
              <InventoryModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                handler={handleDelete}
                item_name={item_name}
              ></InventoryModal>
            )}
            <Link to={`/inventory/${item.id}/edit`}>
              <Edit />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export default InventoryItem;
