import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Usercontext";
import ResourceCard from "./ResourceCard";
import LoadIcon from "../common/LoadIcon";
import FirmSearchApi from "../Api";

function ResourcePage() {
  const navigate = useNavigate();
  const [resState, setResources] = useState(null);

  function handleClick(e) {
    e.preventDefault();
    navigate("/addresourceform");
  }

  useEffect(function getResourcesOnLoad() {
    loader();
  }, []);

  async function loader() {
    const resInfo = await FirmSearchApi.getResources();

    setResources(resInfo);
  }

  const { currUser } = useContext(UserContext);

  if (!resState) return <LoadIcon />;

  return (
    <>
      <div className="resource-page">
        <h1 className="resource-title">Resources</h1>
        <div className="resource-container">
          {resState ? (
            <div>
              {resState.map((r) => (
                <li key={r.id}>
                  <ResourceCard data={r} />
                </li>
              ))}
            </div>
          ) : (
            <p>No Resources Found</p>
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
                Add a Resource
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

export default ResourcePage;
