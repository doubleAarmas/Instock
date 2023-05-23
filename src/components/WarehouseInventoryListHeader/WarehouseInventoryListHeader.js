import { Link } from "react-router-dom";
import "./WarehouseInventoryListHeader.scss";

function WarehouseInventoryListHeader({ title, text, link }) {
  return (
    <>
      <div className="secheader">
        <h1 className="secheader__title">{title}</h1>
        <input className="secheader__search" placeholder="Search..."></input>
        <Link to={link}>
          <button className="secheader__button">+ Add New {text}</button>
        </Link>
      </div>
    </>
  );
}

export default WarehouseInventoryListHeader;
