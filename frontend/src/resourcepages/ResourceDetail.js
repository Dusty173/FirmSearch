import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FirmSearchApi from "../Api";
import Gather from "../common/Gather";
import "./resourcecard.css";
import UserContext from "../Usercontext";

function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const navigate = useNavigate();
  const { currUser } = useContext(UserContext);

  useEffect(
    function getResourceData() {
      async function getResource() {
        const resourceRes = await FirmSearchApi.getResource(id);
        setResource(resourceRes[0]);
      }
      getResource();
    },
    [id]
  );

  async function handleDelete(e) {
    e.preventDefault();

    let deletedata = { id: resource.id };
    const deleted = await FirmSearchApi.deleteResource(deletedata);
    navigate("/resources");
    return deleted;
  }

  if (!resource) return <Gather />;

  let time = resource.created_at;
  let newTime = new Date(time);
  let formattedTime = newTime.toDateString();

  return (
    <>
      <div>
        <h1>{resource.title}</h1>
        <h3>
          Written by: {resource.firstname} {resource.lastname}
        </h3>
        <h4>Posted: {formattedTime}</h4>
        <h4>
          Link: <a href={resource.link}>{resource.link}</a>
        </h4>
        <p className="textdata">{resource.textdata}</p>
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

export default ResourceDetail;
