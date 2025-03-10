import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import stateCodes from "./stateCodes";

function ResearchPage() {
  const [advisorData, setAdvisorData] = useState(null);
  const [formData, setFormData] = useState({});

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

  function handleSubmit(e) {
    e.preventDefault();

    // To do
  }

  return (
    <>
      <div className="search-div">
        <div className="search-form">
          <form>
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
          </form>
        </div>
      </div>
    </>
  );
}

export default ResearchPage;
