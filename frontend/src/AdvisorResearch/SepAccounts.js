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
  let BusNm;

  if (account) {
    custodians = account["3-custodiansForSeparatelyManagedAccounts"];
    BusNm = custodians[0]["b-businessName"];
    return { custodians, BusNm };
  }

  console.log("BUSNM", BusNm);
  console.log("CUST", custodians);

  return (
    <>
      <h4>Separately Managed Accounts and Custodians:</h4>
      <ul>Custodians:</ul>
    </>
  );
}

export default SepAccounts;
