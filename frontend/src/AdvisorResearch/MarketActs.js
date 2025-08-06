import React from "react";
import "./Market.css";
import handleOutput from "../common/handleOutput";

function MarketActivities({ passInfo }) {
  const mInfo = passInfo.Item5L;
  //   console.log("MINFO", mInfo)
  return (
    <>
      <h4 className="market-title">Marketing Activities:</h4>
      <div>
        {mInfo.Q5L1A &
        mInfo.Q5L1D &
        mInfo.Q5L1E &
        mInfo.Q5L2 &
        mInfo.Q5L3 &
        (mInfo.Q5L4 === "N") ? (
          <h4>No Advertisements/Marketing reported</h4>
        ) : (
          <ul>
            <li className={handleOutput(mInfo.Q5L2)}>
              Pays or otherwise provide cash or non-cash compensation, directly
              or indirectly, in connection with the use of testimonials,
              endorsements, or third-party ratings
            </li>
            <li className={handleOutput(mInfo.Q5L1A)}>
              This Firms Advertisements include Performance results.
            </li>
            <li className={handleOutput(mInfo.Q5L1D)}>
              This Firm Advertisements include Testimonials.
            </li>
            <li className={handleOutput(mInfo.Q5L1E)}>
              This Firm Advertisements include Endorsements.
            </li>
            <li className={handleOutput(mInfo.Q5L3)}>
              This Firm Advertisements include Hypothetical Performance.
            </li>
            <li className={handleOutput(mInfo.Q5L4)}>
              This Firm Advertisements include Predecessor Performance.
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
export default MarketActivities;
