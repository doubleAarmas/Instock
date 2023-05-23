import arrowIcon from "../../assets/icons/arrow_back-24px.svg";
import dropDown from "../../assets/icons/arrow_drop_down-24px.svg";
import Error from "../../assets/icons/error-24px.svg";
import "./InventoryItemEdit.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

function InventoryItemEdit() {
  const [btnState, setBtnState] = useState(true);

  function handleInstockChange(){
      setBtnState(btnState => true );
  }
  function handleOutOfStockChange(){
    setBtnState(btnState => false);
}
  let toggleClassCheck = btnState ? '': 'outstock';

  const { id } = useParams();
  const pageURL = "http://localhost:5051/inventory";
  const pageURL2 = "http://localhost:5051/warehouses";
  const pageURL3 = 'http://localhost:3000/inventory'

  const [warehouses, setWarehouses] = useState([]);

  const [formState, setFormState] = useState({
    id: "",
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: "",
  });

  const [fieldValidation, setFieldValidation] = useState({
    item_name: true,
    description: true,
    quantity: true,
  });

  useEffect(() => {
    axios
      .get(pageURL2)
      .then((response) => {
        let warehousesData = response.data;
        setWarehouses(warehousesData);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${pageURL}/${id}`)
      .then((res) => {
        let inventoryItem = res.data;
        setFormState(inventoryItem);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "warehouse_id") {
      const selectedWarehouse = warehouses.find(
        (warehouse) => warehouse.id === value
      );
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
        warehouse_name: selectedWarehouse.name, // add this line to update the warehouse_name
      }));
    } else if (name === "quantity" && value == '0') {
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleWarehouseChange = (event) => {
    if (formState.warehouse_name !== event.target.value) {
      let newWarehouse = warehouses.find(
        (warehouse) => warehouse.warehouse_name === event.target.value
      );
      console.log(event.target.value);
      setFormState((prevState) => {
        return {
          ...prevState,
          warehouse_id: newWarehouse.id,
          warehouse_name: event.target.value,
        };
      });
    }
  };

  const editingInventoryItem = async () => {
    try {
      console.log("Request payload:", formState);
      await axios.put(`${pageURL}/${formState.id}`, formState);
      alert("Inventory item has been edited");
      window.location.reload()
    } catch (err) {
      console.log("Error response:", err.response);
      console.log(err);
      console.log(formState);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let isError = false;

    if (formState.item_name.trim() === "") {
      isError = true;
      setFieldValidation((prevState) => {
        return {
          ...prevState,
          item_name: false,
        };
      });
    } else {
      setFieldValidation((prevState) => {
        return {
          ...prevState,
          item_name: true,
        };
      });
    }

    if (formState.description.trim() === "") {
      isError = true;
      setFieldValidation((prevState) => {
        return {
          ...prevState,
          description: false,
        };
      });
    } else {
      setFieldValidation((prevState) => {
        return {
          ...prevState,
          description: true,
        };
      });
    }
    if (formState.status.trim() === "") {
      isError = true;
      setFieldValidation((prevState) => {
        return {
          ...prevState,
          status: false,
        };
      });
    } else {
      setFieldValidation((prevState) => {
        return {
          ...prevState,
          status: true,
        };
      });
    }
    if (formState.quantity.toString().trim() === "") {
      isError = true;
      setFieldValidation((prevState) => {
        return {
          ...prevState,
          quantity: false,
        };
      });
    } else {
      setFieldValidation((prevState) => {
        return {
          ...prevState,
          quantity: true,
        };
      });
    }

    if (isError) {
      console.log("Error: Form is validated");
      return;
    } else {
      editingInventoryItem()
    }
  };

  return (
    <div className="edit-inventory__card">
      <nav className="edit-inventory__nav">
        <span className="edit-inventory__nav-title-icon">
        <Link to={pageURL3}>
            <img
              className="edit-inventory__nav-title-icon"
              src={arrowIcon}
              alt="arrow icon"
            />
          </Link>
          <h1 className="edit-inventory__nav-title">Edit Inventory Item</h1>
        </span>
      </nav>
      <form className="edit-inventory__form" onSubmit={handleFormSubmit}>
        <div className="edit-inventory__form-display">
          <div className="edit-inventory__form-details">
            <h3 className="edit-inventory__form-details-title">
              {" "}
              Item Details
            </h3>
            <label className="edit-inventory__form-details-subtitle">
              Item Name
              <input
                value={formState.item_name}
                onChange={handleInputChange}
                className="edit-inventory__form-details-input-item--margin"
                name="item_name"
                type="text"
                wrap="hard"
              />
            </label>
            {!fieldValidation.item_name && (
              <p className="form__required">
                <img
                  src={Error}
                  alt="error for required field"
                  className="form__required-img"
                />
                This field is required.
              </p>
            )}
            <label className="edit-inventory__form-details-subtitle">
              Description
              <textarea
                value={formState.description}
                onChange={handleInputChange}
                className="edit-inventory__form-details-input-item--description"
                name="description"
                type="text"
                wrap="hard"
              ></textarea>
            </label>
            {!fieldValidation.description && (
              <p className="form__required">
                <img
                  src={Error}
                  alt="error for required field"
                  className="form__required-img"
                />
                This field is required.
              </p>
            )}
            <div className="select-wrapper">
              <label className="edit-inventory__form-details-subtitle">
                Category{" "}
              </label>
              <select
                value={formState.category}
                onChange={handleInputChange}
                className="edit-inventory__form-details-input-item"
                name="category"
              >
                <option value="Electronics">Electronics</option>
                <option value="Gears">Gears</option>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
                <option value="Health">Health</option>
              </select>
              <img
                src={dropDown}
                className="dropdown-icon"
                alt="Dropdown Icon"
              />
            </div>
          </div>
          <div className="edit-inventory__form-avaibility">
            <h3 className="edit-inventory__form-avaibility-title">
              {" "}
              Item Avaibility{" "}
            </h3>
            <div className="edit-inventory__form-avaibility-form">
              <label className="edit-inventory__form-avaibility-label">
                Status
              </label>
              <div className="edit-inventory__form-avaibility-select">
                <label className="edit-inventory__form-avaibility-instock">
                  <input
                    className="edit-inventory__form-avaibility-instock-input"
                    type="radio"
                    name="status"
                    // checked={formState.status === "In Stock"}
                    onChange={handleInputChange}
                    onClick={handleInstockChange}
                  />
                  In stock
                </label>
                <label className="edit-inventory__form-avaibility-outstock">
                  <input
                    className="edit-inventory__form-avaibility-outstock-input"
                    type="radio"
                    name="status"
                    // checked={formState.status === "Out of Stock"}
                    onChange={handleInputChange}
                    onClick={handleOutOfStockChange}
                  />
                  Out of stock
                </label>
              </div>
            </div>
            <label
              className={`edit-inventory__form-avaibility-quantity ${toggleClassCheck}`}
            >
              {" "}
              Quantity
              <input
                value={formState.quantity}
                onChange={handleInputChange}
                className="edit-inventory__form-avaibility-quantity-input"
                name="quantity"
                type="text"
                wrap="hard"
              />
            </label>
            {!fieldValidation.quantity && (
              <p className="form__required">
                <img
                  src={Error}
                  alt="error for required field"
                  className="form__required-img"
                />
                This field is required.
              </p>
            )}
            <div className="edit-inventory__form-warehouse select-wrapper">
              <label className="edit-inventory__form-details-subtitle">
                Warehouse
              </label>
              <select
                className="edit-inventory__form-warehouse-input"
                name="warehouse_name"
                onChange={handleWarehouseChange}
              >
                {warehouses.map((warehouse, index) => (
                  <option key={index} value={warehouse.warehouse_name}>
                    {warehouse.warehouse_name}
                  </option>
                ))}
              </select>
              <img
                src={dropDown}
                className="dropdown-icon__warehouse"
                alt="Dropdown Icon"
              />
            </div>
          </div>
        </div>
        <div className="edit-inventory__form-button">
        <Link to={pageURL3}>
          <button
            className="edit-inventory__form-button-cancel"
           
          >
            Cancel
          </button>
          </Link>
          <button
            className="edit-inventory__form-button-save"
            type="submit"
            // onClick={goBack}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default InventoryItemEdit;

