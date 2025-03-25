import React, { useEffect, useState } from "react";
import "./Services.css";
import Gather from "../common/Gather";
import axios from "axios";

function Brochure({ CrdNb }) {
  const crdNb = CrdNb;
  const [brochure, setBroch] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(function getFirmBrochure() {
    async function getBrochure(crdNb) {
      const res = await axios.get(
        `https://api.sec-api.io/form-adv/brochures/${crdNb}?token=${API_KEY}`
      );

      setBroch(res.data.brochures);
    }
    getBrochure(crdNb);
  }, []);

  console.log("BROCHURES:", brochure);

  return (
    <>
      {brochure ? (
        <div className="brochure">
          <ul className="brochure-list">
            {brochure.map((b) => (
              <li key={b.versionId}>
                <a href={b.url} target="blank">
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
