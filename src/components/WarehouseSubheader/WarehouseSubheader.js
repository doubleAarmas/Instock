import arrowIcon from "../../assets/icons/arrow_back-24px.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";
import { Link, useParams } from "react-router-dom";
import "./WarehouseSubheader.scss";

function WarehouseSubheaher({ warehouseDetailData }) {
  const { warehouseId } = useParams();

  if (!warehouseDetailData) {
    return null;
  }

  return (
    <div className="warehouse-detail__card">
      <nav className="warehouse-detail__nav">
        <span className="warehouse-detail__nav-title-icon">
          <Link to={"/warehouses"}>
            <img
              className="warehouse-detail__nav-title-icon"
              src={arrowIcon}
              alt="arrow icon"
            />
          </Link>
          <h1 className="warehouse-detail__nav-title">
            {warehouseDetailData.warehouse_name}
          </h1>
        </span>
        <Link to={`/warehouses/${warehouseId}/edit`}>
          <button className="warehouse-detail__nav-button">
            <EditIcon
              className="warehouse-detail__nav-button-icon"
              fill="white"
            />
            Edit
          </button>
        </Link>
      </nav>

      <div className="warehouse-detail__infos">
        <div className="warehouse-detail__info--padding">
          <h3 className="warehouse-detail__info-title">WAREHOUSE ADDRESS:</h3>
          <div className="warehouse-detail__info-address">
            <p className="warehouse-detail__info-detail ">
              {warehouseDetailData.address}
            </p>
            <p className="warehouse-detail__info-detail address">
              {warehouseDetailData.city}, {warehouseDetailData.country}
            </p>
          </div>
        </div>
        <div className="warehouse-detail__info--display">
          <div className="warehouse-detail__info--margin">
            <h3 className="warehouse-detail__info-title">CONTACT NAME:</h3>
            <p className="warehouse-detail__info-detail">
              {warehouseDetailData.contact_name}
            </p>
            <p className="warehouse-detail__info-detail">
              {warehouseDetailData.contact_position}
            </p>
          </div>
          <div className="warehouse-detail__info">
            <h3 className="warehouse-detail__info-title">
              CONTACT INFORMATION:
            </h3>
            <p className="warehouse-detail__info-detail">
              {warehouseDetailData.contact_phone}
            </p>
            <p className="warehouse-detail__info-detail">
              {warehouseDetailData.contact_email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseSubheaher;
