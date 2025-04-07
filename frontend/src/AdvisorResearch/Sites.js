import React, { useEffect, useState } from "react";
import "./Site.css";

function Sites({ sites }) {
  console.log("SITES", sites);

  return (
    <>
      {sites.map((s) => (
        <li key={s}>
          <a className="sites" href={s} target="blank">
            {s.toLowerCase()}
          </a>
        </li>
      ))}
    </>
  );
}

export default Sites;
