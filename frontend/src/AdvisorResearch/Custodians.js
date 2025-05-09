import React, { useEffect, useState } from "react";
import "./Custodians.css";
import axios from "axios";
import BusinessActs from "./BusinessActs";
import Participation from "./PartClientInt";

function SepAccounts({ CrdNb, PF, BusActs, otherInfo }) {
  // console.log("SA-CRD", CrdNb);

  const [account, setAcc] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(
    function getFirmAccounts() {
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
    },
    [CrdNb, API_KEY]
  );

  let custodians;

  if (account) {
    custodians = account["3-custodiansForSeparatelyManagedAccounts"];
  }

  console.log("CUST", custodians);
  return (
    <>
      {!custodians ? (
        <p>No custodians or separately managed accounts found</p>
      ) : (
        <ul>
          <h3>FP Services Review</h3>
          <h4>Custodians for Separately Managed Accounts:</h4>
          {custodians.map((c) => (
            <li className="custodian" key={c["a-legalName"]}>
              {c["b-businessName"]}:&nbsp;&nbsp;
              {c["c-locations"][0].city}, {c["c-locations"][0].state}.
            </li>
          ))}
          <br />

          <div>
            <BusinessActs busActs={BusActs} />
          </div>
          <div>
            <Participation partTransactions={otherInfo} />
          </div>
        </ul>
      )}
    </>
  );
}

export default SepAccounts;
