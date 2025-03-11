import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../forms/form.css";
import stateCodes from "./stateCodes";
import SECApi from "../SECapi";
import AdvisorList from "./AdvisorList";

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
    console.log(formData);
  }

  // Dropdown component, could move to other file but easier to keep here.

  function Dropdown() {
    return (
      <select id="state" name="state" onChange={handleChange}>
        {stateCodes.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }

  // Submission handler also checks for possible empty fields
  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.state) setFormErr("Please select a state");

    if (!formData.city) setFormErr("Must type a city name!");

    if (!formData.zip) setFormErr("Must input 5 digit zip code!");

    let inData = {
      state: formData.state,
      city: formData.city,
      zip: formData.zip,
    };
    console.log("FORM", formData); //Check for accurate data in console (Delete this later)
    try {
      let res = await SECApi.getCombination(inData);

      console.log(res);
      navigate("/advisorlist");
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
            <label htmlFor="state">
              State-<i>required</i>
            </label>
            <Dropdown />
            <label htmlFor="city">City</label>
            <input onChange={handleChange} id="city" name="city" type="text" />
            <label htmlFor="zip">Zip Code</label>
            <input
              name="zip"
              id="zip"
              type="text"
              pattern="[0-9]{5}"
              onChange={handleChange}
            />

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
