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
    setAboutState(aboutInfo[0]);
  }

  const { currUser } = useContext(UserContext);

  console.log("STATE", aboutState);

  if (!aboutState) return <LoadIcon />;

  const { email, aboutinfo, contact } = aboutState;
  return (
    <>
      <div className="About">
        <h1>About Firm Search</h1>
        <div className="about-container">
          <p className="about-us">{aboutinfo}</p>
        </div>
        <div className="contactinfo-container">
          <ul className="contactinfo">
            <li className="contact-number">{contact}</li>
            <li className="contact-email">{email}</li>
          </ul>
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
