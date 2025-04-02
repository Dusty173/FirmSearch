import React, { useEffect, useState } from "react";
import "./Services.css";

function Sites({ sites }) {
  console.log("SITES", sites);

  return (
    <>
      {sites.map((s) => (
        <li>
          <a href={s} target="blank">
            {s}
          </a>
        </li>
      ))}
    </>
  );
}

export default Sites;
