import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Usercontext";
import "./About.css";
import FirmSearchApi from "../Api";
import LoadIcon from "../common/LoadIcon";

function Aboutpage() {
  const navigate = useNavigate();
  const [aboutState, setAboutState] = useState(null);

  function handleClick(e) {
    e.preventDefault();
    navigate("/updabout");
  }

  useEffect(function getAboutOnLoad() {
    loader();
  }, []);

  async function loader() {
    const aboutInfo = await FirmSearchApi.getAbout();
    console.log(aboutInfo);
    setAboutState(aboutInfo[0]);
  }

  const { currUser } = useContext(UserContext);

  if (!aboutState) return <LoadIcon />;

  const { email, aboutinfo, contact } = aboutState;
  return (
    <>
      <div className="About">
        <h1 className="about-us-title">About Us</h1>
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
        <>
          <h6>
            <p>Logged in as: {currUser.username}</p>
          </h6>
          {currUser.is_admin ? (
            <div className="edit-container">
              <button onClick={handleClick} className="edit-btn">
                Edit About us
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

export default Aboutpage;
