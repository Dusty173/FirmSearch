import React, { useEffect, useState } from "react";
import "./Market.css";
import Gather from "../common/Gather";
import handleOutput from "../common/handleOutput";

function MarketActivities({ passInfo }) {
  const mInfo = passInfo.Item5L;
  //   console.log("MINFO", mInfo)
  return (
    <>
      <h4 className="market-title">Marketing Activities:</h4>
      {mInfo.Q5L1D == "Y" || mInfo.Q5L1E == "Y" ? (
        <ul>
          <li className={handleOutput(mInfo.Q5L1D)}>
            This Firms Advertisements include Endorsements
          </li>
          <li className={handleOutput(mInfo.Q5L1E)}>
            This Firms Advertisements include Third Party Ratings
          </li>
        </ul>
      ) : (
        <p>
          No Advertisement Endorsements or Third-Party Rating usage Reported.
        </p>
      )}
    </>
  );
}
export default MarketActivities;
