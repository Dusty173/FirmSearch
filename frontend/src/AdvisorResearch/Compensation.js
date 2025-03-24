import React, { useEffect, useState } from "react";
import "./Comp.css";
import Gather from "../common/Gather";
import handleOutput from "../common/handleOutput";

function Compensation({ comp_Agrees }) {
  return (
    <>
      <div>
        <ul>
          <li className={handleOutput(comp_Agrees.Q5E1)}>
            Takes percentage of assets under management
          </li>
          <li className={handleOutput(comp_Agrees.Q5E2)}>Charges Hourly</li>
          <li className={handleOutput(comp_Agrees.Q5E3)}>Subscription Fees</li>
          <li className={handleOutput(comp_Agrees.Q5E4)}>Fixed Fees</li>
          <li className={handleOutput(comp_Agrees.Q5E5)}>Commissions</li>
          <li className={handleOutput(comp_Agrees.Q5E6)}>
            Performance Based Fees
          </li>
          <li className={handleOutput(comp_Agrees.Q5E7)}>
            Other Fees Specified by Firm: {comp_Agrees.Q5E7Oth}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Compensation;
