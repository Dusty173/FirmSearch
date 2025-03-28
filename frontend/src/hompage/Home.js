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

  const { homepgtxt } = homeState;
  return (
    <>
      <div className="Home">
        <h1>Advisory Evaluator</h1>
        <p className="app-description">
          <i>{homepgtxt}</i>
        </p>
        <p className="informative-notes">
          Who is included: Independent Registered Investment Advisors, as per
          the SEC.
        </p>
        <p className="informative-notes">
          We pull our data directly from SEC filings, which are updated once
          <i> daily</i>, as well as all registered firms are required to update
          <i> annually</i>. If you believe any data is not correct, or is not
          being displayed properly, please contact us on our{" "}
          <a className="contact-btn" href="/aboutus">
            About Page
          </a>{" "}
          to correct any problems. Thank you!
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
