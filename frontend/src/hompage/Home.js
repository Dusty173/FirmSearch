import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Usercontext";
import "./Home.css";
import FirmSearchApi from "../Api";
import LoadIcon from "../common/LoadIcon";
import ResearchPage from "../AdvisorResearch/Research";

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
  // console.log("HOMESTATE", homeState);
  const { homepgtxt } = homeState;
  return (
    <>
      <div className="Home">
        <p className="app-description">
          <i>{homepgtxt}</i>
        </p>
        <p className="informative-notes">
          <b>
            How <i>you</i> can learn more about any registered investment
            advisor?
          </b>{" "}
          By reviewing the most pertinent portions of their respective Form ADV.
          Search below to get started!
        </p>
        <p className="informative-notes">
          We pull our data directly from SEC filings, which all registered firms
          are required to update
          <i> annually</i>. If you believe any data is not correct, or is not
          being displayed properly, please contact us on our{" "}
          <a className="contact-btn" href="/aboutus">
            About Page
          </a>{" "}
          Thank you!
        </p>
        <div className="search-area">
          <ResearchPage />
        </div>

        {currUser ? (
          <>
            <h3>
              <i>Welcome back, {currUser.username}!</i>
            </h3>

            {currUser.is_admin ? (
              <div className="admin-msg-container">
                <p className="admin-msg">
                  You're seeing this message because you've been logged in as an
                  Administrator and are capable of manipulating all data on this
                  site.
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
