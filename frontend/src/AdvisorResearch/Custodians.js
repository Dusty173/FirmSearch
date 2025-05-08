import React, { useEffect, useState } from "react";
import "./Custodians.css";
import Gather from "../common/Gather";
import axios from "axios";
import handlePercent from "../common/togglePercent";
import BusinessActs from "./BusinessActs";
import Participation from "./PartClientInt";

function SepAccounts({ CrdNb, PF, BusActs, otherInfo }) {
  // console.log("SA-CRD", CrdNb);

  const [account, setAcc] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(function getFirmAccounts() {
    async function getAccounts(CrdNb) {
      try {
        const res = await axios.get(
          `https://api.sec-api.io/form-adv/schedule-d-5-k/${CrdNb}?token=${API_KEY}`
        );
        // console.log(res.data);
        setAcc(res.data);
      } catch (error) {}
    }
    getAccounts(CrdNb);
  }, []);

  let custodians;
  let percentages;
  if (account) {
    custodians = account["3-custodiansForSeparatelyManagedAccounts"];
    percentages = account["1-separatelyManagedAccounts"];
  }

  // console.log("PERC:", percentages);
  return (
    <>
      {!custodians ? (
        <p>No custodians or separately managed accounts found</p>
      ) : (
        <ul>
          <h3>FP Services Review</h3>
          <h4>Custodians for Separately Managed Accounts:</h4>
          {custodians.map((c) => (
            <li className="custodian" key={c["a-legalName"]}>
              {c["b-businessName"]}:&nbsp;&nbsp;
              {c["c-locations"][0].city}, {c["c-locations"][0].state}.
            </li>
          ))}
          <br />

          <div className="custodian-percent">
            <h4>End of Year Percentages:</h4>

            {percentages["b"] ? (
              <>
                <li>
                  Exchange Traded Equity:&nbsp;
                  <i className="percent">
                    {percentages["b"]["i-exchangeTradedEquity"]["endOfYear"]}
                  </i>
                </li>
                <li>
                  Non-Exchange Traded Equity:&nbsp;
                  <i className="percent">
                    {
                      percentages["b"]["ii-nonExchangeTradedEquity"][
                        "endOfYear"
                      ]
                    }
                  </i>
                </li>
                <li>
                  U.S. Government Bonds:&nbsp;
                  <i className="percent">
                    {percentages["b"]["iii-usGovernmentBonds"]["endOfYear"]}
                  </i>
                </li>
                <li>
                  U.S. State and Local Bonds:&nbsp;
                  <i className="percent">
                    {percentages["b"]["iv-usStateAndLocalBonds"]["endOfYear"]}
                  </i>
                </li>
                <li>
                  Sovereign Bonds:&nbsp;
                  <i className="percent">
                    {percentages["b"]["v-sovereignBonds"]["endOfYear"]}
                  </i>
                </li>
                <li>
                  Investment Grade Corporate Bonds:&nbsp;
                  <i className="percent">
                    {
                      percentages["b"]["vi-investmentGradeCorporateBonds"][
                        "endOfYear"
                      ]
                    }
                  </i>
                </li>
                <li>
                  Non-Investment Grade Corporate Bonds:&nbsp;
                  <i className="percent">
                    {
                      percentages["b"]["vii-nonInvestmentGradeCorporateBonds"][
                        "endOfYear"
                      ]
                    }
                  </i>
                </li>
                <li>
                  Derivatives:&nbsp;
                  <i className="percent">
                    {percentages["b"]["viii-derivatives"]["endOfYear"]}
                  </i>
                </li>
                <li>
                  Pooled Investment Vehicles:&nbsp;
                  <i className="percent">
                    {
                      percentages["b"]["x-pooledInvestmentVehicles"][
                        "endOfYear"
                      ]
                    }
                  </i>
                </li>
                <li>
                  Cash:&nbsp;
                  <i className="percent">
                    {percentages["b"]["xi-cash"]["endOfYear"]}
                  </i>
                </li>
                <li>
                  Other:&nbsp;
                  <i className="percent">
                    {percentages["b"]["xii-other"]["endOfYear"]}
                  </i>
                </li>
              </>
            ) : (
              <p>No End of Year Percentages Reported</p>
            )}

            <h4>Is an Advisor to Private Funds?</h4>
            <li className="PF">{PF === "Y" ? "Yes" : "No"}</li>
          </div>
          <div>
            <BusinessActs busActs={BusActs} />
          </div>
          <div>
            <Participation partTransactions={otherInfo} />
          </div>
        </ul>
      )}
    </>
  );
}

export default SepAccounts;
