import React, { useEffect, useState } from "react";
import "./Services.css";
import handleNumOut from "../common/handleNumOut";
import "./Staff.css";

function Staff({ staff, totalStaff }) {
  return (
    <>
      <div className="staff-container">
        <h4>Staff Breakdown</h4>
        <ul className="staff-list">
          <li className="total-staff">
            Total Advisory Staff: <b>{totalStaff || "No Staff Reported"}</b>
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
          <small>(Some Staff may perform multiple roles)</small>
        </ul>
      </div>
    </>
  );
}

export default Staff;
