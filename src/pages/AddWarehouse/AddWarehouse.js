import './AddWarehouse.scss';
import BackButton from '../../assets/icons/arrow_back-24px.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Error from '../../assets/icons/error-24px.svg';

function EditWarehouse() {

  const pageURL = 'http://localhost:5051/warehouses';
  const pageURL2 = 'http://localhost:3000/warehouses';

  //States

  const [formState, setFormState] = useState({
    warehouse_name: '',
    address: '',
    city: '',
    country: '',
    contact_name: '',
    contact_position: '',
    contact_phone: '',
    contact_email: '',
  });

  const [fieldValidation, setFieldValidation] = useState({
    warehouse_name: true,
    address: true,
    city: true,
    country: true,
    contact_name: true,
    contact_position: true,
    contact_phone: true,
    contact_email: true,
  })

  //Form Input Change

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      return ({
        ...prevState,
        [name]: value,
      }
      )
    })
  }

  // Async function call

  const addingWarehouse = async () => {
    try {
      await axios.post((`${pageURL}`), formState)
      alert('Warehouse has been added')
      window.location.reload()
    }
    catch (err) {
      console.log(err)
    }
  }

  //Form Submit

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let isError = false;

    const phoneRegex = /^(\+1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
    const emailRegex = /[a-z0-9@.]+$/i;

    if (formState.warehouse_name.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          warehouse_name: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          warehouse_name: true,
        })
      })
    }
    if (formState.address.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          address: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          address: true,
        })
      })
    }
    if (formState.city.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          city: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          city: true,
        })
      })
    }
    if (formState.country.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          country: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          country: true,
        })
      })
    }
    if (formState.contact_name.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          contact_name: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          contact_name: true,
        })
      })
    }
    if (formState.contact_position.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          contact_position: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          contact_position: true,
        })
      })
    }
    if (formState.contact_phone.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          contact_phone: false,
        })
      })
    } else if (!phoneRegex.test(formState.contact_phone.trim()) === true) {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          contact_phone: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          contact_phone: true,
        })
      })
    }
    if (formState.contact_email.trim() === "") {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          contact_email: false,
        })
      })
    } else if (!emailRegex.test(formState.contact_email.trim()) === true) {
      isError = true;
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          contact_email: false,
        })
      })
    } else {
      setFieldValidation(prevState => {
        return ({
          ...prevState,
          contact_email: true,
        })
      })
    }


    //make axios call
    if (isError) {
      console.log('Error: Form is invalid');
      return;
    } else {
      addingWarehouse()
    }
  }


  return (
    <div className="edit-warehouse">
      <header className="edit-warehouse__header">
        <Link to="/warehouses">
          <img className="edit-warehouse__img" src={BackButton} alt="go back button" />
        </Link>
        <h1 className="edit-warehouse__title">
          Add Warehouse
        </h1>
      </header>
      <main className="edit-warehouse__main">
        <form className="form" onSubmit={handleFormSubmit}>
          <div className="form-warehouse">
            <h2 className="form-warehouse__title">Warehouse Details</h2>
            <label className="form-warehouse__name-label" htmlFor="warehouse_name"> Warehouse Name</label>
            <input
              className={`form-warehouse__name-input ${fieldValidation.warehouse_name ? '' : 'form-warehouse__name-input--error'}`}
              value={formState.warehouse_name}
              onChange={handleInputChange}
              name="warehouse_name"
              type="text"
            ></input>
            {!fieldValidation.warehouse_name && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}
            <label className="form-warehouse__address-label" htmlFor="address">Street Address</label>
            <input value={formState.address}
              onChange={handleInputChange}
              className={`form-warehouse__address-input ${fieldValidation.address ? '' : 'form-warehouse__city-input--error'}`}
              name="address"
              type="text"
            ></input>
            {!fieldValidation.address && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}
            <label className="form-warehouse__city-label" htmlFor="city">City</label>
            <input value={formState.city}
              onChange={handleInputChange}
              className={`form-warehouse__city-input ${fieldValidation.city ? '' : 'form-warehouse__city-input--error'}`}
              name="city"
              type="text"
            ></input>
            {!fieldValidation.city && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}
            <label className="form-warehouse__country-label" htmlFor="country">Country</label>
            <input value={formState.country}
              onChange={handleInputChange}
              className={`form-warehouse__country-input ${fieldValidation.country ? '' : 'form-warehouse__country-input--error'}`}
              name="country"
              type="text"
            ></input>
            {!fieldValidation.country && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}
          </div>
          <div className="form-contact">
            <h2 className="form-contact__title">Contact Details</h2>
            <label className="form-contact__name-label" htmlFor="contactName">Contact Name</label>
            <input value={formState.contact_name}
              onChange={handleInputChange}
              className={`form-contact__name-input ${fieldValidation.contact_name ? '' : 'form-contact__name-input--error'}`}
              type="text"
              name="contact_name"
            ></input>
            {!fieldValidation.contact_name && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}
            <label className="form-contact__position-label" htmlFor="position">Position</label>
            <input value={formState.contact_position}
              onChange={handleInputChange}
              className={`form-contact__position-input ${fieldValidation.contact_position ? '' : 'form-contact__position-input--error'}`}
              type="text"
              name="contact_position"
            ></input>
            {!fieldValidation.contact_position && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}
            <label className="form-contact__phone-number-label" htmlFor="contact_phone">Phone Number</label>
            <input value={formState.contact_phone}
              onChange={handleInputChange}
              className={`form-contact__phone-number-input ${fieldValidation.contact_phone ? '' : 'form-contact__phone-number-input--error'}`}
              type="tel"
              name="contact_phone"
            ></input>
            {!fieldValidation.contact_phone && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}
            <label className="form-contact__email-label" htmlFor="email">Email</label>
            <input value={formState.contact_email}
              onChange={handleInputChange}
              className={`form-contact__email-input ${fieldValidation.contact_email ? '' : 'form-contact__email-input--error'}`}
              type="text"
              name="contact_email"
            ></input>
            {!fieldValidation.contact_email && <p className="form__required"><img src={Error} alt="error for required field" className="form__required-img" />This field is required.</p>}          </div>
          <div className="form-buttons">
            <Link to={`${pageURL2}`} className="form-buttons__cancel-link">
              <button className="form-buttons__cancel">Cancel</button>
            </Link>
            <button className="form-buttons__submit" type="submit">Add</button>
          </div>
        </form>
      </main>
    </div>

  )
}

export default EditWarehouse;
