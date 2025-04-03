import React, { useEffect, useState } from "react";
import "./Services.css";
import Gather from "../common/Gather";
import axios from "axios";

function SepAccounts({ CrdNb }) {
  console.log("SA-CRD", CrdNb);

  const [account, setAcc] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(function getFirmAccounts() {
    async function getAccounts(CrdNb) {
      const res = await axios.get(
        `https://api.sec-api.io/form-adv/schedule-d-5-k/${CrdNb}?token=${API_KEY}`
      );
      console.log(res.data);
      setAcc(res.data);
    }
    getAccounts(CrdNb);
  }, []);

  let custodians;

  if (account) {
    custodians = account["3-custodiansForSeparatelyManagedAccounts"];
  }

  console.log("CUST", custodians);

  return (
    <>
      <h4>Separately Managed Accounts and Custodians:</h4>
      <ul>
        Custodians:
        {custodians.map((c) => (
          <li key={c["a-legalName"]}>{c["b-businessName"]}</li>
        ))}
      </ul>
    </>
  );
}

export default SepAccounts;
