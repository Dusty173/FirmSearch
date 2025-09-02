import React, { useEffect, useState } from "react";
import "./Services.css";
import handleNumOut from "../common/handleNumOut";
import "./Staff.css";
import handleOutput from "../common/handleOutput";

function Staff({ staffInfo, totalStaff }) {
  // console.log("STAFF:", staffInfo, "Total staff:", totalStaff);

  let staff = staffInfo.Item5B;
  let Item2 = staffInfo.Item2A;

  return (
    <>
      <div className="staff-container">
        <h4 className="staff-title">Staff Breakdown</h4>
        <ul className="staff-list">
          <li className="total-staff">
            Total Advisory Staff:&nbsp;
            <b>{totalStaff || "No Staff Reported"}</b>
          </li>
          <li className={handleNumOut(staff.Q5B1)}>
            Staff performing Investment Advisory Functions including Research:
            <br />
            {staff.Q5B1}
          </li>
          <li className={handleNumOut(staff.Q5B2)}>
            Staff that are Registered Representatives of a Broker-Dealer:
            <br />
            {staff.Q5B2}
          </li>
          <li className={handleNumOut(staff.Q5B3)}>
            Staff that are Registered with One or More State Securities
            authorities as an Investment Advisor Representative:
            <br /> {staff.Q5B3}
          </li>
          <li className={handleNumOut(staff.Q5B4)}>
            Staff that are Registered with One or More State Securities
            authorities as an Investment Advisor Representative OTHER than this
            firm:
            <br /> {staff.Q5B4}
          </li>
          <li className={handleNumOut(staff.Q5B5)}>
            Staff that are Licensed Agents of an Insurance Company/Agency:
            <br />
            {staff.Q5B5}
          </li>
          <li className={handleNumOut(staff.Q5B6)}>
            Amount of People/Firms that solicit clients on this Firms behalf:
            <br />
            {staff.Q5B6}
          </li>
          <li className={handleOutput(Item2.Q2A5)}>
            Firm is an Investment Advisor to an Investment company (ie Mutual
            Fund)
          </li>
          <li className={handleOutput(Item2.Q2A8)}>
            Firm is a Related Adviser under rule 203A-2(b) that controls, is
            controlled by, or is under common control with, an Investment
            Adviser that is registered with the SEC, and the Principal Office
            and place of business is the same as the Registered Adviser.
          </li>
          <li className={handleOutput(Item2.Q2A11)}>
            Firm is an Internet Advisor.
          </li>
          <small>(Some Staff may perform multiple roles)</small>
        </ul>
      </div>
    </>
  );
}

export default Staff;
