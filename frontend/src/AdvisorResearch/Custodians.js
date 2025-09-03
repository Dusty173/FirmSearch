import React, { useEffect, useState } from "react";
import "./Custodians.css";
import BusinessActs from "./BusinessActs";
import Participation from "./PartClientInt";
import handleOutput from "../common/handleOutput";
import SchedApi from "../Schedapi";

function SepAccounts({ CrdNb, BusActs, otherInfo }) {
  // console.log("SA-CRD", CrdNb);
  const [account, setAcc] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const Item9A = otherInfo.Item9A;

  useEffect(
    function getFirmAccounts() {
      async function getAccounts(CrdNb) {
        try {
          const res = await SchedApi.getSchedD5K(CrdNb);
          // console.log("Custodians SMA", res);
          setAcc(res);
        } catch (error) {}
      }
      getAccounts(CrdNb);
    },
    [CrdNb, API_KEY]
  );

  let custodians;
  let misc;
  if (account) {
    custodians = account["3-custodiansForSeparatelyManagedAccounts"];
    misc = account["1-separatelyManagedAccounts"];
  }

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
            <h4>Standing Letter of Instruction</h4>
            {Item9A.Q91A1 || Item9A.Q9A1B === "Y" ? (
              <ul>
                <li className={handleOutput(Item9A.Q91A1)}>
                  This Firm has Custody of Cash or Bank Accounts
                </li>
                <li className={handleOutput(Item9A.Q9A1B)}>
                  This Firm has Securities
                </li>
              </ul>
            ) : (
              <p>No SLOA Reported</p>
            )}
          </div>
          <div>
            <BusinessActs busActs={BusActs} altBusActs={otherInfo} />
          </div>
          <div>
            <Participation partTransactions={otherInfo} miscInfo={misc} />
          </div>
        </ul>
      )}
    </>
  );
}

export default SepAccounts;
