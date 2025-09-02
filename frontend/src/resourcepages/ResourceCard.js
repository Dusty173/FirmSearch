import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ResourceCard({ data }) {
  const resource = data;
  const title = resource.title;
  const text = resource.textdata;
  const id = resource.id;

  // console.log("REV_ID:", id);

  return (
    <>
      <div className="resource-card">
        <Link to={`/resources/${id}`}>
          <div className="resource-data">
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ResourceCard;
