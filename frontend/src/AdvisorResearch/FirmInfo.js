import React from "react";
import "./firminfo.css";
import handleOutput from "../common/handleOutput";

function FirmInfo({ firmInfo }) {
  let firm = firmInfo;

  return (
    <>
      <div className="firm-info">
        <div className="Item7A">
          <h4>Financial Industry Affiliations</h4>
          {firm.Item7A ? (
            <ul>
              <li className={handleOutput(firm.Item7A.Q7A10)}>Accountant(s)</li>
              <li className={handleOutput(firm.Item7A.Q7A11)}>
                Lawyer/Law firms
              </li>
              <li className={handleOutput(firm.Item7A.Q7A12)}>
                Insurance Company/Agencies
              </li>
            </ul>
          ) : (
            <p>No Affiliations Reported</p>
          )}
        </div>
        <div className="ItemJ">
          {firm.Part1b ? (
            <div>
              <h5>
                Sole Proprietorship Information (Only for state registered
                advisors)
              </h5>
              <ul>
                <li className={handleOutput(firm.Part1b.ItemJ.Q1BJ2BCfp)}>
                  Is a Certified Financial Planner (CFP)
                </li>
                <li className={handleOutput(firm.Part1b.ItemJ.Q1BJ2BCfa)}>
                  Is a Chartered Financial Analyst (CFA)
                </li>
                <li className={handleOutput(firm.Part1b.ItemJ.Q1BJ2BChfc)}>
                  Is a Chartered Financial Consultant (ChFC)
                </li>
              </ul>
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </>
  );
}

export default FirmInfo;
