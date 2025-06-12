import React from "react";
import "./Custodians.css";
import handleOutput from "../common/handleOutput";

function Investing({ info }) {
  const Item5J = info.Item5J;
  const Item5K = info.Item5K;

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
      </ul>
    </>
  );
}
export default Investing;
