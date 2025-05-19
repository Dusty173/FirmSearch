import React from "react";
import "./Market.css";

function MarketActivities({ passInfo }) {
  const mInfo = passInfo.Item5L;
  //   console.log("MINFO", mInfo)
  return (
    <>
      <h4 className="market-title">Marketing Activities:</h4>
      {mInfo.Q5L2 === "Y" ? (
        <ul>
          <li className="pays">
            Pays or otherwise provide cash or non-cash compensation, directly or
            indirectly, in connection with the use of testimonials,
            endorsements, or third-party ratings
          </li>
        </ul>
      ) : (
        <p>No Advertisement Activities Reported.</p>
      )}
    </>
  );
}
export default MarketActivities;
