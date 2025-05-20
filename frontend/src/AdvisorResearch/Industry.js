import React from "react";
import "./industry.css";
import handleOutput from "../common/handleOutput";

function Industry({ firminfo }) {
  let Items = firminfo;

  return (
    <>
      <div className="firm-info">
        <div className="Item7A">
          <h4>Financial Industry Affiliations</h4>
          {Items.Item7A.Q7A9 ? (
            <ul>
              <li className={handleOutput(Items.Item7A.Q7A9)}>
                Trust Companies
              </li>
              <li className={handleOutput(Items.Item7A.Q7A10)}>
                Accountant(s)
              </li>
              <li className={handleOutput(Items.Item7A.Q7A11)}>
                Lawyer/Law firms
              </li>
              <li className={handleOutput(Items.Item7A.Q7A12)}>
                Insurance Company/Agencies
              </li>
              <li className={handleOutput(Items.Item7A.Q7A14)}>
                Real Estate Broker/Dealer(s)
              </li>
            </ul>
          ) : (
            <p>No Affiliations Reported</p>
          )}
        </div>
        <div className="ItemJ">
          {Items.Part1b ? (
            <div>
              <h4>
                Sole Proprietorship Information (Only for state registered
                advisors)
              </h4>
              <ul>
                <li className={handleOutput(Items.Part1b.ItemJ.Q1BJ2BCfp)}>
                  Is a Certified Financial Planner (CFP)
                </li>
                <li className={handleOutput(Items.Part1b.ItemJ.Q1BJ2BCfa)}>
                  Is a Chartered Financial Analyst (CFA)
                </li>
                <li className={handleOutput(Items.Part1b.ItemJ.Q1BJ2BChfc)}>
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

export default Industry;
