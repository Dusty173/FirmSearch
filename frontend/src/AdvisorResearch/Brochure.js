import React, { useEffect, useState } from "react";
import "./Services.css";
import "./Brochures.css";
import SchedApi from "../Schedapi";

function Brochure({ CrdNb }) {
  const crdNb = CrdNb;
  const [brochure, setBroch] = useState([]);
  useEffect(
    function getFirmBrochure() {
      async function getBrochure(crdNb) {
        try {
          const res = await SchedApi.getBrochures(crdNb);

          setBroch(res);
        } catch (err) {}
      }
      getBrochure(crdNb);
    },
    [crdNb]
  );

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
