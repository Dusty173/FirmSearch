import React, { useEffect, useState } from "react";
import "./Site.css";

function Sites({ sites }) {
  console.log("SITES", sites);

  return (
    <>
      {sites.map((s) => (
        <li>
          <a className="sites" href={s} target="blank">
            {s}
          </a>
        </li>
      ))}
    </>
  );
}

export default Sites;
