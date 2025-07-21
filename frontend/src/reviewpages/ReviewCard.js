import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import "./reviewcard.css";

function ReviewCard({ data }) {
  console.log(data);
  const review = data;
  const title = review.title;
  const text = review.textdata;
  const id = review.id;

  console.log("REV_ID:", id);

  return (
    <>
      <Link to={`/reviews/${id}`}>
        <div className="review-card">
          <h2>
            {title}
          </h2>
          <p>{text}</p>
        </div>
      </Link>
    </>
  );
}

export default ReviewCard;
