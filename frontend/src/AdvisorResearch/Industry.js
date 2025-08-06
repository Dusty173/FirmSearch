import React from "react";
import "./industry.css";
import handleOutput from "../common/handleOutput";

function Industry({ firminfo }) {
  let Items = firminfo;

  return (
    <>
      <div className="firm-info">
        <div className="Item7A">
          <h4>Financial Industry Affiliations and/or Related Persons:</h4>
          {Items.Item7A ? (
            <ul>
              <li className={handleOutput(Items.Item7A.Q7A1)}>
                Broker Dealer, Municipal Securities Dealer, or Government
                Securities Broker or Dealer.
              </li>
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
              <li className={handleOutput(Items.Item7A.Q7A13)}>
                Pensions Consultant
              </li>
              <li className={handleOutput(Items.Item7A.Q7A14)}>
                Real Estate Broker/Dealer(s)
              </li>
              <li className={handleOutput(Items.Item7A.Q7A16)}>
                Sponsor, General Partner, Managing Member of Pooled Investment
                Vehicles.
              </li>
              <li className={handleOutput(Items.Item7B.Q7B)}>
                Is an Advisor to any Private Fund.
              </li>
            </ul>
          ) : (
            <p>No Affiliations Reported</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Industry;
