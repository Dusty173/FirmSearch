import React, { useEffect, useState } from "react";
import "./Custodians.css";
import axios from "axios";

function DirectOwners({ CrdNb }) {
  const [owners, setOwn] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const crd = CrdNb;
  //   console.log("DI", crd);

  useEffect(
    function getFirmOwners() {
      async function getOwners(crd) {
        try {
          const res = await axios.get(
            `https://api.sec-api.io/form-adv/schedule-a-direct-owners/${crd}?token=${API_KEY}`
          );
          //   console.log(res.data);
          setOwn(res.data);
        } catch (error) {}
      }
      getOwners(crd);
    },
    [crd, API_KEY]
  );

  let owner = owners;

  // Function to trim everything AFTER the last comma so that we don't see middle names.
  function trimAfterLastComma(str) {
    if (str.split(",").length < 3) {
      return str; // <-- If no middle name is added then we return the full string.
    }
    const lastCommaIndex = str.lastIndexOf(",");
    if (lastCommaIndex === -1) {
      return str;
    }
    return str.substring(0, lastCommaIndex);
  }

  function displayType(OT) {
    if (OT === "DE") return "Domestic Entity";
    if (OT === "FE") return "Foreign Entity";
    if (OT === "I") return "Individual";
  }

  return (
    <>
      <div className="owners-list">
        <h4>Direct Owners</h4>

        {owner.map((o) => (
          <ul key={o.name}>
            <li>{trimAfterLastComma(o.name)}</li>
            <li>Title: {o.titleStatus}</li>
            <li>Owner Type: {displayType(o.ownerType)}</li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default DirectOwners;
