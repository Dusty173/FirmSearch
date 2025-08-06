import React from "react";
import "./firminfo.css";
import handleNum from "../common/handleNum";

function FirmInfo({ firmInfo }) {
  // Set Items variable to save/access Info without issues
  let Items = firmInfo;
  const BTI = Items.Item5D.Q5DC1;
  const InvComp = Items.Item5D.Q5DD1;
  const Pooled = Items.Item5D.Q5DF1;
  const Insure = Items.Item5D.Q5DL1;
  const TotalNonDesc = Items.Item5F.Q5F2B;
  const totalForeign = Items.Item5F.Q5F3;

  // console.log("FIRM INFO:", Items);

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

  if (totalIndAUM === NaN || undefined) totalAUMInd = "No Data Available.";
  if (totalHnw === NaN || undefined) totalHnw = "No Data Available.";

  // Function for displaying data depending on if it is present.
  function showOthers(pSharing, charOrgs) {
    if (pSharing || charOrgs) {
      return "shown-title";
    }
    return "hidden";
  }

  // function to make big numbers human readable.
  function addCommas(number) {
    if (isNaN(number)) {
      return " No data available";
    } else {
      return number.toLocaleString("en-US");
    }
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
          <li className={handleNum(BTI)}>
            Banking or Thrift Institutions: <b>{BTI}</b>
          </li>
          <li className={handleNum(InvComp)}>
            Investment Companies: <b>{InvComp}</b>
          </li>
          <li className={handleNum(Pooled)}>
            Pooled Investment Vehicle: <b>{Pooled}</b>
          </li>
          <li className={handleNum(Insure)}>
            Insurance Companies: <b>{Insure}</b>
          </li>
          <li className={handleNum(TotalNonDesc)}>
            Total Amount of Non-Discretionary Assets:{" "}
            <b>${addCommas(TotalNonDesc)}</b>
          </li>
          <li className={handleNum(totalForeign)}>
            Total Amount of Assets Under Management for Non-U.S. Persons:{" "}
            <b>${addCommas(totalForeign)}</b>
          </li>
        </ul>
      </div>
    </>
  );
}
export default FirmInfo;
