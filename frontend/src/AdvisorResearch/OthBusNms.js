import React, { useEffect, useState } from "react";
import "./Custodians.css";
import axios from "axios";

function OtherBusNms({ crdNb }) {
  const [BusNames, setBus] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const crd = crdNb;

  useEffect(
    function getAltBusNames() {
      async function getBusNames(crd) {
        try {
          const res = await axios.get(
            `https://api.sec-api.io/form-adv/schedule-d-1-b/${crd}?token=${API_KEY}`
          );
          //   console.log(res.data);
          setBus(res.data);
        } catch (error) {}
      }
      getBusNames(crd);
    },
    [crd, API_KEY]
  );

  const business = BusNames;
  //   console.log("ALT BUS:", business);
  return (
    <>
      {business.length > 0 ? (
        <div>
          <h4>Other Business Names</h4>
          {business.map((b) => (
            <ul key={b.name}>
              <li key={b.name}>{b.name}</li>
              <br />
              <li>Jurisdictions:</li>
              {b.jurisdictions.map((j) => (
                <small key={j} className="j">
                  <i>
                    <b>{j}</b>
                  </i>
                </small>
              ))}
            </ul>
          ))}
        </div>
      ) : (
        <div>
          <h4>Other Business Names</h4>
          <p>None.</p>
        </div>
      )}
    </>
  );
}

export default OtherBusNms;
