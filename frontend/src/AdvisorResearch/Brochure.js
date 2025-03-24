import React, { useEffect, useState } from "react";
import "./Services.css";
import Gather from "../common/Gather";
import axios from "axios";

function Brochure({ CrdNb }) {
  const crdNb = CrdNb;
  const [brochure, setBroch] = useState(null);
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

  return (
    <>
      {brochure ? (
        <div className="brochure">
          <ul>
            {brochure.map((b) => {
              {
                console.log("INSIDE MAP", b.versionId);
              }
              <li key={b.versionId}>{b.name}</li>;
            })}
          </ul>
        </div>
      ) : (
        <p>No Brochures Found</p>
      )}
    </>
  );
}

export default Brochure;
