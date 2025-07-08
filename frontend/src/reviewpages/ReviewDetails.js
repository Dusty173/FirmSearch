import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirmSearchApi from "../Api";
import Gather from "../common/Gather";

function ReviewDetails() {
  const { id } = useParams();
  const [review, setReview] = useState(null);

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

  //   let time = review.created_at;
  //   let newTime = new Date(time);
  //   let formattedTime = newTime.toDateString();

  console.log("REV DETAILS", review);
  if (!review) return <Gather />;
  return (
    <>
      <div>
        <h1>{review.title}</h1>
        <h3>
          Written by: -AuthID:{review.author_id}- (--ADD AUTHOR NAME HERE LATER)
        </h3>
        <h4>Posted: {review.created_at} ______Fix This</h4>
        <h4>
          Link: <a href={review.link}>{review.link}</a>
        </h4>
        <p>{review.textdata}</p>
      </div>
    </>
  );
}

export default ReviewDetails;
