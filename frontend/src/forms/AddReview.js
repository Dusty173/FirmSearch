import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import UserContext from "../Usercontext";

function ReviewForm() {
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
      let result = await FirmSearchApi.addReview(formData);
      navigate("/reviews");
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
      <div className="review-page">
        <h2 className="review-title">Add a review</h2>
        <div className="reviewform">
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
              Submit Review
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

export default ReviewForm;
