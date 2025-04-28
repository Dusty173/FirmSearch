import React, { useEffect, useState } from "react";
import "./Site.css";

function Sites({ sites }) {
  // console.log("SITES", sites);

  return (
    <>
      <ul>
        {sites.map((s) => (
          <li className="siteLi" key={s}>
            <a className="sites" href={s} target="blank">
             <small className="site">{s.toLowerCase()}</small>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Sites;
