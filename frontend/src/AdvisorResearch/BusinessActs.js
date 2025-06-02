import React, { useEffect, useState } from "react";
import "./Custodians.css";
import Gather from "../common/Gather";
import handleOutput from "../common/handleOutput";

function BusinessActs({ busActs, altBusActs }) {
  const altActs = altBusActs.Item6B;
  return (
    <>
      <h4>Other Business Activities:</h4>
      {busActs.Q6A1 ? (
        <ul>
          <li className={handleOutput(busActs.Q6A1)}>Broker Dealer</li>
          <li className={handleOutput(busActs.Q6A2)}>
            Registered Representative of a Broker Dealer
          </li>
          <li className={handleOutput(busActs.Q6A3)}>
            Commodity Pool Operator or Commodity Trading Advisor
          </li>
          <li className={handleOutput(busActs.Q6A4)}>
            Futures Commission Merchant
          </li>
          <li className={handleOutput(busActs.Q6A5)}>
            Real Estate Broker, Dealer, or Agent
          </li>
          <li className={handleOutput(busActs.Q6A6)}>
            Insurance Broker or Agent
          </li>
          <li className={handleOutput(busActs.Q6A7)}>
            Bank(Includes Separately Identifiable Dept. or Division of a Bank)
          </li>
          <li className={handleOutput(busActs.Q6A8)}>Trust Company</li>
          <li className={handleOutput(busActs.Q6A9)}>
            Registered Municipal Advisor
          </li>
          <li className={handleOutput(busActs.Q6A10)}>
            Registered Security-Based Swap Dealer
          </li>
          <li className={handleOutput(busActs.Q6A11)}>
            Major Security-Based Swap Participant
          </li>
          <li className={handleOutput(busActs.Q6A12)}>
            Accountant or Accounting Firm
          </li>
          <li className={handleOutput(busActs.Q6A13)}>Lawyer or Law Firm</li>
          <li className={handleOutput(busActs.Q6A14)}>
            Other Financial Product Salesperson:&nbsp;{busActs.Q6A14Oth}
          </li>
        </ul>
      ) : (
        <p>No Alternate Business Activities Reported</p>
      )}
      {altActs.Q6B1 ? (
        <ul>
          <li className={handleOutput(altActs.Q6B1)}>
            This Firm Engages in Other Business Activities.
          </li>
          <li className={handleOutput(altActs.Q6B3)}>
            This Firm Sells Products or Services other than Investment Advice to
            Clients.
          </li>
          <li className={handleOutput(altActs.Q6B2)}>
            This Firm Sponsors the Wrap Fee Program.
          </li>
        </ul>
      ) : (
        <span></span>
      )}
    </>
  );
}

export default BusinessActs;
