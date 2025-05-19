import React from "react";
import "./firminfo.css";
import handleNum from "../common/handleNum";

function FirmInfo({ firmInfo }) {
  // Set Items variable to save/access Info without issues
  let Items = firmInfo;

  // Get number of Individuals and HNW Individuals
  const totalInd = Items.Item5D.Q5DA1;
  const totalHnwInd = Items.Item5D.Q5DB1;

  // Other Orgs
  const pSharing = Items.Item5D.Q5DG1;
  const charOrgs = Items.Item5D.Q5DH1;

  // Set variables for math
  const totalAUMInd = Items.Item5D.Q5DA3;
  const totalHnwIndAUM = Items.Item5D.Q5DB3;

  // Do math for All individuals
  let avgAUM = totalAUMInd / totalInd;

  // Do math for High Net worth Individuals
  let avgHnwAUM = totalHnwIndAUM / totalHnwInd;

  // Prettier totals
  let totalIndAUM = Math.round(avgAUM);
  let totalHnw = Math.round(avgHnwAUM);

  // Function for displaying data depending on if it is present.
  function showOthers(pSharing, charOrgs) {
    if (pSharing || charOrgs) {
      return "shown-title";
    }
    return "hidden";
  }

  // function to make big numbers human readable.
  function addCommas(number) {
    return number.toLocaleString("en-US");
  }

  return (
    <>
      <div className="client-type">
        <h4>Client Type</h4>
        <ul>
          <li>
            Individuals: <b>{totalInd}</b>
          </li>
          <li className="shown">
            Average Assets Under Management for Individuals:{" "}
            <b>${addCommas(totalIndAUM)}</b>
          </li>
          <br />
          <li>
            High Net Worth Individuals: <b>{totalHnwInd}</b>
          </li>
          <li className="shown">
            Average Assets Under Management for High Net Worth Individuals:{" "}
            <b>${addCommas(totalHnw)}</b>
          </li>
          <li className={showOthers(pSharing, charOrgs)}>Other Management:</li>
          <li className={handleNum(pSharing)}>
            Pension and Profit Sharing Plans: <b>{pSharing}</b>
          </li>
          <li className={handleNum(charOrgs)}>
            Charitable Organizations: <b>{charOrgs}</b>
          </li>
        </ul>
      </div>
    </>
  );
}
export default FirmInfo;
