import React from "react";
import "../Header/Header.scss";
import watermark from "../../assets/logos/InStock-Logo_1x.png";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__watermark">
        <NavLink
          className="header__watermark--link"
          to="/warehouses"
          style={{ textDecoration: "none" }}
        >
          <img
            className="header__watermark--file"
            src={watermark}
            alt="Instock Logo"
          />
        </NavLink>
      </div>
      <div className="header__buttons">
        <NavLink className="header__buttons--warehouse" to="/warehouses">
          <button
            className={`header__buttons--warehouse--wrapper`}
          >
            <p>Warehouses</p>
          </button>
        </NavLink>
        <NavLink className="header__buttons--inventory" to="/inventory">
          <button
            className={`header__buttons--inventory--wrapper`}
          >
            <p> Inventory</p>
          </button>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
