import React, { useEffect, useState } from "react";
import "./Site.css";

function Sites({ sites, site }) {
  console.log("SITES", sites, "site:", site);

  return (
    <>
      {sites != undefined ? (
        <ul>
          {sites.map((s) => (
            <li className="siteLi" key={s}>
              <a className="sites" href={s} target="blank">
                <small className="site">{s.toLowerCase()}</small>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          <li className="siteLi">
            <a className="sites" href={site} target="blank">
              <small className="site">{site}</small>
            </a>
          </li>
        </ul>
      )}
    </>
  );
}

export default Sites;
