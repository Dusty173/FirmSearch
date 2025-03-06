import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Usercontext";
import "./Home.css";
import FirmSearchApi from "../Api";
import LoadIcon from "../common/LoadIcon";

function Homepage() {
  const { currUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [homeState, setHomeState] = useState(null);

  function handleClick(e) {
    e.preventDefault();
    navigate("/updhome");
  }

  useEffect(function getHomeOnLoad() {
    loader();
  }, []);

  async function loader() {
    const hometxt = await FirmSearchApi.getHome();
    setHomeState(hometxt.home);
  }

  if (!homeState) return <LoadIcon />;

  const { homepgtxt } = homeState;
  return (
    <>
      <div className="Home">
        <h1>Firm Search!</h1>
        <p className="app-description">
          <i>{homepgtxt}</i>
        </p>
        {currUser ? (
          <>
            <h3>
              <i>Welcome back, {currUser.username}!</i>
            </h3>

            {currUser.is_admin ? (
              <div className="admin-msg-container">
                <p className="admin-msg">
                  You're seeing this message because you've been logged in as an
                  Administrator and are capable of manipulatiing all data on
                  this site.
                </p>
                <div className="edit-container">
                  <button onClick={handleClick} className="edit-btn">
                    Edit Mission Statement
                  </button>
                </div>
              </div>
            ) : (
              <span></span>
            )}
          </>
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
}

export default Homepage;
