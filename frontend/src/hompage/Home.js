import React, { useContext } from "react";
import UserContext from "../Usercontext";
import "./Home.css";

function Homepage() {
  const { currUser } = useContext(UserContext);
  return (
    <>
      <div className="Home">
        <h1>Firm Search!</h1>
        <p className="app-description">
          <i>
            Welcome to our site! Our goal is to take the large amount of
            confusing data about Investment firms in your area and compress them
            into something that is more easily understood, as well as give you a
            downloadable PDF format of that information!
          </i>
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
