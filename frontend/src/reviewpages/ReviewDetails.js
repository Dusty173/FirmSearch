import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FirmSearchApi from "../Api";
import Gather from "../common/Gather";
import "./reviewcard.css";
import UserContext from "../Usercontext";

function ReviewDetails() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const navigate = useNavigate();
  const { currUser } = useContext(UserContext);

  useEffect(
    function getReviewData() {
      async function getReview() {
        const revRes = await FirmSearchApi.getReview(id);
        setReview(revRes[0]);
      }
      getReview();
    },
    [id]
  );

  async function handleDelete(e) {
    e.preventDefault();

    let deletedata = { id: review.id };

    console.log("Deletion ID", deletedata);
    const deleted = await FirmSearchApi.deleteReview(deletedata);
    navigate("/reviews");
    return deleted;
  }

  if (!review) return <Gather />;

  let time = review.created_at;
  let newTime = new Date(time);
  let formattedTime = newTime.toDateString();

  console.log("REV DETAILS", review);

  return (
    <>
      <div>
        <h1>{review.title}</h1>
        <h3>
          Written by: {review.firstname} {review.lastname}
        </h3>
        <h4>Posted: {formattedTime}</h4>
        <h4>
          Link: <a href={review.link}>{review.link}</a>
        </h4>
        <p className="textdata">{review.textdata}</p>
      </div>
      {currUser.is_admin ? (
        <button className="remove-btn" onClick={handleDelete}>
          Delete this Review (Cannot Be Undone!)
        </button>
      ) : (
        <span></span>
      )}
    </>
  );
}

export default ReviewDetails;
