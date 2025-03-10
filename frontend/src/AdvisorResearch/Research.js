import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";

function ResearchPage() {
  const [advisorData, setAdvisorData] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
    setFormErr([]);
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
          </form>
        </div>
      </div>
    </>
  );
}

export default ResearchPage;
