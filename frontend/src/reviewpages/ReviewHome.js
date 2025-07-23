import React, { useState, useEffect, useContext } from "react";
import FirmSearchApi from "../Api";
import UserContext from "../Usercontext";
import "../aboutpage/About.css";
import { useNavigate } from "react-router-dom";
import LoadIcon from "../common/LoadIcon";
import ReviewCard from "./ReviewCard";

function ReviewPage() {
  const navigate = useNavigate();
  const [revState, setRevState] = useState(null);

  function handleClick(e) {
    e.preventDefault();
    navigate("/addreviewform");
  }

  useEffect(function getReviewsOnLoad() {
    loader();
  }, []);

  async function loader() {
    const revInfo = await FirmSearchApi.getReviews();

    setRevState(revInfo);
  }

  const { currUser } = useContext(UserContext);

  if (!revState) return <LoadIcon />;

  return (
    <>
      <div className="review-page">
        <h1 className="rev-title">Reviews</h1>
        <div className="rev-container">
          {revState ? (
            <div>
              {revState.map((r) => (
                <li key={r.id}>
                  <ReviewCard data={r} />
                </li>
              ))}
            </div>
          ) : (
            <p>No Reviews</p>
          )}
        </div>
      </div>
      {currUser ? (
        <>
          <h6>
            <p>Logged in as: {currUser.username}</p>
          </h6>
          {currUser.is_admin ? (
            <div className="edit-container">
              <button onClick={handleClick} className="edit-btn">
                Add a Review
              </button>
            </div>
          ) : (
            <span></span>
          )}
        </>
      ) : (
        <span></span>
      )}
    </>
  );
}

export default ReviewPage;
