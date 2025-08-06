import React from "react";
import "./Custodians.css";
import handleOutput from "../common/handleOutput";
import handleString from "../common/handleString";
import handleNum from "../common/handleNum";

function Investing({ info }) {
  // console.log("INFO:", info);
  const Item5J = info.Item5J;
  const Item5K = info.Item5K;
  const pooled = info.Item5D.Q5D1F;
  const clients = info.Item5C.Q5C1;
  const cli100 = info.Item5C.Q5C2;

  return (
    <>
      <h4>Investing Practices</h4>
      <ul>
        <li className={handleOutput(Item5J.Q5J1)}>
          This Firm Provides Investment Advise Only with respect to Limited
          Types of Investments.
        </li>
        <li className={handleOutput(Item5K.Q5K1)}>
          This Firm has Regulatory Assets Under Management attributed to clients
          other than listed on Form ADV.
        </li>
        <li className={handleOutput(Item5K.Q5K2)}>
          This Firm engages in borrowing transactions on behalf of any of the
          separately managed account clients that they advise.
        </li>
        <li className={handleOutput(Item5K.Q5K3)}>
          This Firm engages in derivative transactions on behalf of any of the
          separately managed account clients that they advise
        </li>
        <h4>Information about Advisory Business:</h4>
        <li className={handleString(clients)}>
          This Firm provided Investment Advisory services to {clients} clients
          in the last fiscal year.
        </li>
        {cli100 >= 100 ? (
          <li>Client number rounded to nearest 100: {cli100}</li>
        ) : (
          <span></span>
        )}
        <li className={handleNum(pooled)}>
          Pooled Investment Vehicles (Other than Investment Companies) in
          10/2012 version: {pooled}
        </li>
      </ul>
    </>
  );
}
export default Investing;
