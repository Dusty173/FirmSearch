import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./research.css";
import stateCodes from "./stateCodes";
import SECApi from "../SECapi";
import AdvisorList from "./AdvisorList";
import SECAlert from "../common/SECAlert";
import LoadIcon from "../common/LoadIcon";
import handleTF from "../common/handleTF";

function ResearchPage() {
  const [advisorData, setAdvisorData] = useState(null);
  const [aSearch, setASearch] = useState(false);
  const [formErr, setFormErr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    BusNm: "",
    crd: "",
  });

  const navigate = useNavigate();

  // toggle advanced Search
  function advancedSearch(e) {
    e.preventDefault();
    setASearch(!aSearch);
  }

  // Reset state to try new search
  function handleRefresh(e) {
    e.preventDefault();
    window.location.reload(false);
  }

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

  // Alternate submission handler for looking up by name.
  async function handleSubmit(e) {
    e.preventDefault();
    <LoadIcon />;
    let inData = {
      state: formData.state,
      city: formData.city,
      BusNm: formData.BusNm,
      crd: formData.crd,
    };

    console.log(inData);

    // Search by CRD when provided, ignores all other fields.
    if (inData.crd.length > 1) {
      try {
        let res = await SECApi.getByCrd(inData.crd);
        setAdvisorData(res.filings);
        return;
      } catch (err) {
        setFormErr(err);
        return;
      }
    }

    // Search by business name if state and city are left empty.
    if (inData.state === "" && inData.city === "") {
      try {
        let res = await SECApi.getByName(inData.BusNm);
        setAdvisorData(res.filings);
        return;
      } catch (err) {
        setFormErr(err);
        return;
      }
    }

    // Search by state and city if no business name is provided
    if (inData.BusNm === undefined || inData.BusNm === "") {
      try {
        let res = await SECApi.getStateCity(inData);
        setAdvisorData(res.filings);
        return;
      } catch (err) {
        setFormErr(err);
        return;
      }
    }

    try {
      let res = await SECApi.getBySearch(inData);
      // console.log(res.filings); // Check for accurate data in console <=== (Delete later)
      setAdvisorData(res.filings);
      return;
    } catch (err) {
      setFormErr(err);
      return;
    }
  }

  let advisorObj = advisorData;

  return (
    <>
      {advisorData === null ? (
        <div className="search-div">
          <div>
            <form className="search-form">
              <label htmlFor="state">State:</label>
              <Dropdown />
              <label htmlFor="city">City:</label>
              <input
                className="search-input"
                placeholder="Correct spelling sensitive!"
                onChange={handleChange}
                id="city"
                name="city"
                type="text"
              />

              <label htmlFor="BusNm">Business Name:</label>
              <input
                className="search-input"
                placeholder="Not required"
                onChange={handleChange}
                id="BusNm"
                name="BusNm"
                type="text"
              />
              <label htmlFor="crd">CRD Number:</label>
              <input
                className="search-input"
                placeholder="Not required"
                onChange={handleChange}
                id="crd"
                name="crd"
                type="text"
              />
              {formErr ? <SECAlert type="danger" messages={formErr} /> : null}
              <button
                className="search-button"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="advisors-list">
          <button onClick={handleRefresh} className="refresh-btn">
            Reset
          </button>
          <AdvisorList data={advisorObj} />
        </div>
      )}
    </>
  );
}

export default ResearchPage;
