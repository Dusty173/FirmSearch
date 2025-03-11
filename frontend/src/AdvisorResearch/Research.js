import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
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

  // Dropdown for states logic
  const dropdown = document.getElementById("stateDropdown");

  stateCodes.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.code;
    option.text = `${state.code} - ${state.name}`;
    dropdown.add(option);
  });

  // Form data change event handler
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
    setFormErr([]);
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

    try {
      let res = await SECApi.getCombination(inData);
      setFormData({ state: "", zip: "", city: "" });
      console.log(res); //Check for accurate data in console (Delete this later)
      navigate("/advisorlist", <AdvisorList {...res} />);
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
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" />
            <label htmlFor="zip">Zip Code</label>
            <input
              name="zip"
              id="zip"
              type="text"
              pattern="[0-9]{5}"
              onChange={handleChange}
            />
            <label htmlFor="state">State</label>
            <select id="stateDropdown" onChange={handleChange}></select>
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
