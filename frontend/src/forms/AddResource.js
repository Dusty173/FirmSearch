import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import UserContext from "../Usercontext";

function ResourceForm() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);
  const { currUser, setCurrUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    authId: currUser.id,
    textdata: "",
    title: "",
    link: "",
  });

  // Submission handler -----------------------------------------------
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      let result = await FirmSearchApi.addResource(formData);
      navigate("/resources");
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
      <div className="resource-page">
        <h2 className="resource-title">Add a Resource</h2>
        <div className="resourceform">
          <form onSubmit={handleSubmit}>
            <label htmlFor="textdata">Summary</label>
            <textarea
              id="textdata"
              name="textdata"
              value={formData.textdata}
              onChange={handleChange}
            />
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <label htmlFor="link">Link</label>
            <input
              id="link"
              name="link"
              value={formData.link}
              placeholder="If no link applies, type N/A"
              onChange={handleChange}
            />
            <button className="changebtn" onClick={handleSubmit}>
              Submit Resource
            </button>
            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}

export default ResourceForm;
