import React, { useEffect, useState } from "react";
import "./Custodians.css";
import Gather from "../common/Gather";
import axios from "axios";

function SepAccounts({ CrdNb }) {
  // console.log("SA-CRD", CrdNb);

  const [account, setAcc] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(function getFirmAccounts() {
    async function getAccounts(CrdNb) {
      try {
        const res = await axios.get(
          `https://api.sec-api.io/form-adv/schedule-d-5-k/${CrdNb}?token=${API_KEY}`
        );
        // console.log(res.data);
        setAcc(res.data);
      } catch (error) {}
    }
    getAccounts(CrdNb);
  }, []);

  let custodians;

  if (account) {
    custodians = account["3-custodiansForSeparatelyManagedAccounts"];
  }

  // console.log("CUST", custodians);

  return (
    <>
      {!custodians ? (
        <p>No accounts found</p>
      ) : (
        <ul>
          <h4>Custodians for Separately Managed Accounts:</h4>
          {custodians.map((c) => (
            <li className="custodian" key={c["a-legalName"]}>
              {c["b-businessName"]}
              <b>
                <i>&nbsp;located&nbsp;in&nbsp;</i>
              </b>
              {c["c-locations"][0].city}, {c["c-locations"][0].state}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SepAccounts;
