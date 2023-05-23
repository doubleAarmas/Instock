import arrowIcon from '../../assets/icons/arrow_back-24px.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-24px.svg';
import { Link, useParams, useNavigate } from "react-router-dom";
import '../InventoryItemDetails/InventoryItemDetails.scss';
import { React, useState, useEffect } from "react";
import axios from "axios";

function InventoryItemDetails() {
  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
  const { id } = useParams();
  const [itemDetailData, setItemDetailData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5051/inventory/${id}`)
      .then((res) => {
        setItemDetailData(res.data);
      })
      .then(() =>
        console.log(itemDetailData));
  }, [id])

  if (!itemDetailData) {
    return null;
  }

  
  
  return (
    <div className='item-detail__card'>
      <nav className='item-detail__nav'>
        <div className='item-detail__nav-title-icon'>
          <button className="item-detail__nav-goback" onClick={goBack}>
            <img className='item-detail__nav-title-icon' src={arrowIcon} alt="arrow icon" />
          </button>
          <h1 className='item-detail__nav-title'>{itemDetailData.item_name}</h1>
        </div>
        <Link to={`/inventory/${id}/edit`}>
          <button className='item-detail__nav-button'>
            <EditIcon className='item-detail__nav-button-icon' fill='white' />
            Edit
          </button>
        </Link>
      </nav>
      <div className='item-details'>
        <div className='item-details__wrapper'>
          <div className='item-details__desc'>
            <h3 className='item-details__title'>ITEM DESCRIPTION:</h3>
            <p className='item-details__detail'>{itemDetailData.description}</p>
          </div>
          <div className='item-details__info'>
            <div className='item-details__info-category'>
              <h3 className='item-details__title'>CATEGORY:</h3>
              <p className='item-details__detail'>{itemDetailData.category}</p>
            </div>
          </div>
        </div>
        <div className='item-details__info-wrapper'>
          <div className='item-details__info-wrapper2'>
            <div className='item-details__info-status'>
              <h3 className='item-details__title'>STATUS:</h3>
              <div
                className={itemDetailData.status === "In Stock"
                  ? "item-details__info-status-details in-stock"
                  : "item-details__info-status-details out-of-stock"
                } >
                {itemDetailData.status === "In Stock" ? "IN STOCK" : "OUT OF STOCK"}
              </div>
            </div>
            <div className='item-details__info-quantity'>
              <h3 className='item-details__title'>QUANTITY:</h3>
              <p className='item-details__detail'>{itemDetailData.quantity}</p>
            </div>
          </div>
          <div className='item-details__info-warehouse'>
            <h3 className='item-details__title'>WAREHOUSE:</h3>
            <p className='item-details__detail'>{itemDetailData.warehouse_name}</p>
          </div>
        </div>
      </div>
    </div>
  )

}
export default InventoryItemDetails;
