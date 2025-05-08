import React, { useEffect, useState } from "react";
import "./Services.css";
import axios from "axios";
import "./Brochures.css";

function Brochure({ CrdNb }) {
  const crdNb = CrdNb;
  const [brochure, setBroch] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(function getFirmBrochure() {
    async function getBrochure(crdNb) {
      try {
        const res = await axios.get(
          `https://api.sec-api.io/form-adv/brochures/${crdNb}?token=${API_KEY}`
        );

        setBroch(res.data.brochures);
      } catch (err) {}
    }
    getBrochure(crdNb);
  }, []);

  // console.log("BROCHURES:", brochure);
  return (
    <>
      {brochure.length ? (
        <div className="brochures">
          <ul className="brochure-list">
            <h4 className="broch-title">Brochures:</h4>
            {brochure.map((b) => (
              <li key={b.versionId}>
                <a className="broch" href={b.url} target="blank">
                  {b.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>No Brochures Found</p>
        </div>
      )}
    </>
  );
}

export default Brochure;
