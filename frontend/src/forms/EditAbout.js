import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";

function AboutForm() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState({
    aboutinfo: "",
    contact: "",
    email: "",
  });

  // Submission handler -----------------------------------------------
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      let result = await FirmSearchApi.editAbout(formData);
      navigate("/aboutus");
      return result;
    } catch (err) {
      setFormErrors(err);
    }
  }

  // Form control change handler -----------------------------------------------
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <>
      <div className="about-page">
        <h2 className="about-title">Edit about information</h2>
        <div className="aboutform">
          <form onSubmit={handleSubmit}>
            <label htmlFor="aboutinfo">Write About Info here</label>
            <input
              type="textarea"
              id="aboutinfo"
              name="aboutinfo"
              value={formData.aboutinfo}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="contact">Contact</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </form>
          <button className="changebtn" onClick={handleSubmit}>
            Submit Changes
          </button>
        </div>
        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}
      </div>
    </>
  );
}

export default AboutForm;
