import arrowIcon from '../../assets/icons/arrow_back-24px.svg'
import dropDown from '../../assets/icons/arrow_drop_down-24px.svg'
import Error from '../../assets/icons/error-24px.svg';
import './InventoryItemAdd.scss'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


function InventoryItemAdd() {
  const [btnState, setBtnState] = useState(true);
  function handleInstockChange() {
    setBtnState(btnState => true);
  }
  function handleOutOfStockChange() {
    setBtnState(btnState => false);
  }
  let toggleClassCheck = btnState ? '' : 'outstock';


  const pageURL = 'http://localhost:5051/inventory'
  const pageURL2 = 'http://localhost:5051/warehouses'
  const pageURL3 = 'http://localhost:3000/inventory'


  const [warehouses, setWarehouses] = useState([]);

  const [formState, setFormState] = useState({
    warehouse_id: '',
    item_name: '',
    description: '',
    category: '',
    status: '',
    quantity: '',
  });

  const [fieldValidation, setFieldValidation] = useState({
    item_name: true,
    description: true,
    quantity: true,
  })


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      return ({
        ...prevState,
        [name]: value,
        status: name === 'quantity' && value === '0' ? 'Out of Stock' : 'In Stock',
      }
      )
    })
  }

  useEffect(() => {
    axios.get(pageURL2).then((response) => {
      let warehousesData = response.data
      setWarehouses(warehousesData);
    })
      .then(() => {
        console.log(warehouses)
      })
      .catch(error => console.log(error));
  }, []);

  const addItem = async () => {
    try {
      console.log(formState)
      await axios.post((`${pageURL}`), formState)
      alert('Item has been added')
      window.location.reload()
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let isError = false;

    if (formState.item_name.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          item_name: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          item_name: true,
        })
      })
    }

    if (formState.description.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          description: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          description: true,
        })
      })
    }
    if (formState.status.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          status: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          status: true,
        })
      })
    }
    if (formState.quantity.toString().trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          quantity: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          quantity: true,
        })
      })
    }

    if (isError) {
      console.log('Error: Form is validated');
      return;
    } else {

      addItem()
    }
  }

  return (

    <div className='add-item__card'>
      <nav className='add-item__nav'>
        <span className='add-item__nav-title-icon'>
          <Link to={pageURL3}>
            <img className='add-item__nav-title-icon' src={arrowIcon} alt="arrow icon" />
          </Link>
          <h1 className='add-item__nav-title'>Add New Inventory Item</h1>
        </span>
      </nav>
      <form className='add-item__form' onSubmit={handleFormSubmit}>
        <div className='add-item__form-display'>
          <div className='add-item__form-details'>
            <h3 className='add-item__form-details-title'> Item Details</h3>
            <label className='add-item__form-details-subtitle'>Item Name
              <input value={formState.item_name} onChange={handleInputChange} className="add-item__form-details-input-item--margin" name="item_name" type="text" wrap="hard" placeholder='Item Name' /></label>
            {!fieldValidation.item_name && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}
            <label className='add-item__form-details-subtitle'>Description
              <textarea value={formState.description} onChange={handleInputChange} className="add-item__form-details-input-item--description" name="description" type="text" wrap="hard" placeholder="Please enter a brief item description..."></textarea></label>
            {!fieldValidation.description && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}
            <div className="select-wrapper">
              <label className='add-item__form-details-subtitle'>Category </label>
              <select value={formState.category} onChange={handleInputChange} className="add-item__form-details-input-item" name="category" >
                <option value="" selected disabled hidden>Please select</option>
                <option value='Electronics'>Electronics</option>
                <option value='Gears'>Gears</option>
                <option value='Apparel'>Apparel</option>
                <option value='Accessories'>Accessories</option>
                <option value='Health'>Health</option>
              </select>
              <img src={dropDown} className="dropdown-icon" alt="Dropdown Icon" />
            </div>
          </div>
          <div className='add-item__form-avaibility'>
            <h3 className='add-item__form-avaibility-title'> Item Avaibility </h3>
            <div className='add-item__form-avaibility-form' >
              <label className='add-item__form-avaibility-label'>Status</label>
              <div className='add-item__form-avaibility-select' >
                <label className='add-item__form-avaibility-instock'>
                  <input className='add-item__form-avaibility-instock-input' type='radio' name='status' value="In Stock"
                    onChange={handleInputChange} onClick={handleInstockChange} />
                  In stock</label>
                <label className='add-item__form-avaibility-outstock'>
                  <input className='add-item__form-avaibility-outstock-input' type='radio' name='status' value="Out of Stock"
                  onChange={handleInputChange} onClick={handleOutOfStockChange}/>
                  Out of stock</label>
              </div>
            </div>
            <label
              className={`add-item__form-avaibility-quantity ${toggleClassCheck}`}> Quantity
              <input value={formState.quantity} onChange={handleInputChange} className="add-item__form-avaibility-quantity-input" name="quantity" type="text" wrap="hard" /></label>
            {!fieldValidation.quantity && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}
            <div className='add-item__form-warehouse select-wrapper' >
              <label className='add-item__form-details-subtitle'>Warehouse</label>
              <select className='add-item__form-warehouse-input' name="warehouse_id" onChange={handleInputChange}>
                <option value="" selected disabled hidden>Please select</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>{warehouse.warehouse_name}</option>
                ))}
              </select>
              <img src={dropDown} className="dropdown-icon__warehouse" alt="Dropdown Icon" />
            </div>
          </div>
        </div>
        <div className='add-item__form-button'>
          <Link to={pageURL3}>
            <button className='add-item__form-button-cancel' >Cancel</button>
          </Link>
          <button className='add-item__form-button-save' type='submit' >Save</button>
        </div>
      </form>
    </div>
  );
}
export default InventoryItemAdd;