import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../forms/form.css";
import stateCodes from "./stateCodes";
import SECApi from "../SECapi";
import AdvisorList from "./AdvisorList";
import SECAlert from "../common/SECAlert";

function ResearchPage() {
  const [advisorData, setAdvisorData] = useState(null);
  const [formErr, setFormErr] = useState([]);
  const [formData, setFormData] = useState({
    state: "",
    zip: "",
    city: "",
  });

  const navigate = useNavigate();

  // Form data change event handler
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));

    setFormErr([]);
  }

  // Dropdown component, could move to other file but easier to keep here.

  function Dropdown() {
    return (
      <select
        id="state"
        name="state"
        value={formData.state}
        onChange={handleChange}
      >
        {stateCodes.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }

  // Submission handler, any empty fields are handled by Api and errors are sent to custom error display.
  async function handleSubmit(e) {
    e.preventDefault();

    let inData = {
      state: formData.state,
      city: formData.city,
      zip: formData.zip,
    };

    try {
      let res = await SECApi.getCombination(inData);
      console.log(inData);
      console.log(res.filings); // Check for accurate data in console <=== (Delete later)
      setAdvisorData(res.filings);
    } catch (err) {
      setFormErr(err);
      return;
    }
  }

  return (
    <>
      <div className="search-div">
        <div className="search-form">
          <form>
            <div className="requiredmsg">
              <b>
                <i>All fields are required</i>
              </b>
            </div>
            <label htmlFor="state">State</label>
            <Dropdown />
            <label htmlFor="city">City</label>
            <input
              placeholder="Correct spelling sensitive!"
              onChange={handleChange}
              id="city"
              name="city"
              type="text"
            />
            <label htmlFor="zip">Zip Code</label>
            <input
              name="zip"
              id="zip"
              type="text"
              pattern="[0-9]{5}"
              onChange={handleChange}
            />
            {formErr ? <SECAlert type="danger" messages={formErr} /> : null}
            <button className="submit-btn" onClick={handleSubmit}>
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResearchPage;
