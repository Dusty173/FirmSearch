import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Usercontext";
import "./About.css";
import FirmSearchApi from "../Api";
import LoadIcon from "../common/LoadIcon";

function Aboutpage() {
  const [aboutState, setAboutState] = useState(null);

  useEffect(function getAboutOnLoad() {
    loader();
  }, []);

  async function loader() {
    const aboutInfo = await FirmSearchApi.getAbout();
    console.log(aboutInfo);
    setAboutState(aboutInfo);
  }

  const { currUser } = useContext(UserContext);

  return (
    <>
      <div className="About">
        <h1>About Firm Search</h1>
        <div className="about-container">
          <p className="about-us">{aboutState}</p>
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
