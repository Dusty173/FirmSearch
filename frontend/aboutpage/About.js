import React, { useContext } from "react";
import UserContext from "../Usercontext";
import "./About.css";

function Aboutpage() {
  const { currUser } = UseContext(UserContext);
  return (
    <>
      <div className="About">
        <h1>About Firm Search</h1>
        <div className="about-container">
          <p className="about-us">
            This will be loaded from our back end, so that it is editable
            without having to re-push to production and bring site down.
          </p>
        </div>
      </div>
      {currUser ? (
        <div className="edit-container">
          <button className="edit-btn">Edit About Us</button>
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
}

export default Aboutpage;
