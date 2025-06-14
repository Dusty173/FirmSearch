import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../forms/form.css";
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
  });

  const navigate = useNavigate();

  // toggle advanced Search
  function advancedSearch(e) {
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

  // Submission handler, any empty fields are handled by Api and errors are sent to custom error display.
  async function handleSubmit(e) {
    e.preventDefault();
    let inData = {
      state: formData.state,
      city: formData.city,
    };

    try {
      let res = await SECApi.getCombination(inData);
      setAdvisorData(res.filings);
      setIsLoading(true);
    } catch (err) {
      setFormErr(err);
    } finally {
      setIsLoading(false);
    }
  }
  // Alternate submission handler for looking up by name.
  async function handleSubmitAlt(e) {
    e.preventDefault();
    <LoadIcon />;
    let inData = {
      BusNm: formData.BusNm,
      city: formData.city,
    };

    if (inData.city == "" || inData.city == undefined) {
      try {
        let res = await SECApi.getByName(inData.BusNm);
        setAdvisorData(res.filings);
        return;
      } catch (err) {
        setFormErr(err);
        return;
      }
    }

    if (inData.BusNm == undefined || inData.BusNm == "") {
      try {
        let res = await SECApi.getByCity(inData.city);
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
          <div className="search-form">
            <div className={handleTF(!aSearch)}>
              <form className="search-form">
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
                {formErr ? <SECAlert type="danger" messages={formErr} /> : null}
                <button
                  className="submit-btn"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </form>
            </div>

            <div className={handleTF(aSearch)}>
              <form className="search-form">
                <h3>Advanced Search</h3>
                <h4 className="aSearch-info">*Not all fields are required*</h4>
                <label htmlFor="city">City</label>
                <input
                  placeholder="Correct spelling sensitive!"
                  onChange={handleChange}
                  id="city"
                  name="city"
                  type="text"
                />
                <label htmlFor="business-name">Business Name</label>
                <input
                  placeholder="Correct spelling sensitive!"
                  onChange={handleChange}
                  id="BusNm"
                  name="BusNm"
                  type="text"
                />
                {formErr ? <SECAlert type="danger" messages={formErr} /> : null}
                <button
                  className="submit-btn"
                  disabled={isLoading}
                  onClick={handleSubmitAlt}
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </form>
            </div>
          </div>
          <div className="ASearch-button">
            <button
              disabled={aSearch}
              className="Adv-Search-btn"
              onClick={advancedSearch}
            >
              Advanced Search
            </button>
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
