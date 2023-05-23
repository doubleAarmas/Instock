import { Link } from "react-router-dom";
import { ReactComponent as Chevron } from "../../assets/icons/chevron_right-24px.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete_outline-24px.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit-24px.svg";
import "./Warehouse.scss";
import axios from "axios";
import { useState } from "react";
import WarehouseModal from "../WarehouseModal/WarehouseModal";

function Warehouse({ warehouse }) {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_phone,
    contact_email,
  } = warehouse;
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5051/warehouses/${warehouse.id}`)
      .then((res) => {
        console.log(res.data);
        setIsOpen(false);
        window.location.reload();
      });
  };
  return (
    <>
      {/* This article is for the mobile resolution */}
      <article className="warehouse">
        <div className="warehouse-container0">
          <div className="warehouse-container1">
            <div className="warehouse-name">
              <p className="warehouse-name__label label">WAREHOUSE</p>
              <Link
                to={`/warehouses/${warehouse.id}`}
                className="warehouse-name__link"
              >
                <p className="warehouse-name__name">
                  {warehouse_name}
                  <Chevron />
                </p>
              </Link>
            </div>
            <div className="warehouse-address">
              <p className="warehouse-address__label label">ADDRESS</p>
              <p className="warehouse-address__address">
                {address}, {city}, {country}
              </p>
            </div>
          </div>
          <div className="warehouse-container2">
            <div className="warehouse-contname">
              <p className="warehouse-contname__label label">CONTACT NAME</p>
              <p className="warehouse-contname__contname">{contact_name}</p>
            </div>
            <div className="warehouse-info">
              <p className="warehouse-info__label label">CONTACT INFORMATION</p>
              <div className="warehouse-info__info">
                <p>{contact_phone}</p>
                <p>{contact_email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="warehouse-icons">
          <Delete onClick={() => setIsOpen(true)} />
          {isOpen && (
            <WarehouseModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              handler={handleDelete}
              warehouse_name={warehouse_name}
            ></WarehouseModal>
          )}
          <Link to={`/warehouses/${warehouse.id}/edit`}>
            <Edit />
          </Link>
        </div>
      </article>

      {/* This article is for the tablet and desktop resolutions */}
      <article className="tab-warehouse">
        <div className="tab-warehouse-container0">
          <div className="tab-warehouse-name">
            <Link
              to={`/warehouses/${warehouse.id}`}
              className="tab-warehouse-name__link"
            >
              <p className="tab-warehouse-name__name">
                {warehouse_name}
                <Chevron />
              </p>
            </Link>
          </div>
          <div className="tab-warehouse-address">
            <p className="tab-warehouse-address__address">
              {address}, {city}, {country}
            </p>
          </div>
          <div className="tab-warehouse-contname">
            <p className="tab-warehouse-contname__contname">{contact_name}</p>
          </div>
          <div className="tab-warehouse-info">
            <div className="tab-warehouse-info__info">
              <p>{contact_phone}</p>
              <p>{contact_email}</p>
            </div>
          </div>
          <div className="tab-warehouse-icons">
            <Delete onClick={() => setIsOpen(true)} />
            {isOpen && (
              <WarehouseModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                handler={handleDelete}
                warehouse_name={warehouse_name}
              ></WarehouseModal>
            )}
            <Link to={`/warehouses/${warehouse.id}/edit`}>
              <Edit />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export default Warehouse;
