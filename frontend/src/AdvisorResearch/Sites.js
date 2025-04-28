import React, { useEffect, useState } from "react";
import "./Site.css";

function Sites({ sites }) {
  // console.log("SITES", sites);

  return (
    <>
      <ul>
        {sites.map((s) => (
          <li className="site" key={s}>
            <a className="sites" href={s} target="blank">
              {s.toLowerCase()}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Sites;
