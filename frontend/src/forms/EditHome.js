import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";

function HomeForm() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState({
    homepgtxt: "",
  });

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await FirmSearchApi.updateHome(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.err);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <>
      <div className="about-page">
        <h2 className="about-title">Sign Up!</h2>
        <div className="aboutform">
          <form onSubmit={handleSubmit}>
            <label htmlFor="homepgtxt">Write a blurb about this site</label>
            <input
              type="textarea"
              id="homepgtxt"
              name="homepgtxt"
              value={formData.homepgtxt}
              onChange={handleChange}
            />
            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            <button className="changebtn" onClick={handleSubmit}>
              Submit Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default HomeForm;
