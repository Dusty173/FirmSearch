import React from "react";
import "./LoadIcon.css";

/** Loading message used by components that fetch Firm data. */

function Gather() {
  return (
    <>
      <div className="LoadIcon"></div>;
      <div className="LoadText">Gathering Data</div>
    </>
  );
}

export default Gather;
