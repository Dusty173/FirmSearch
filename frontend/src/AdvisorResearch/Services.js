import React, { useEffect, useState } from "react";
import "./Services.css";
import Gather from "../common/Gather";
import handleOutput from "../common/handleOutput";

function Services({ service }) {
  

  return (
    <>
      <ul className="services">
        <li id="1" className={handleOutput(service.Q5G1)}>
          Financial Planning Services
        </li>
        <li id="2" className={handleOutput(service.Q5G2)}>
          Portfolio Management for Individuals and/or Small Businesses
        </li>
        <li id="3" className={handleOutput(service.Q5G3)}>
          Portfolio Management for Investment Companies
        </li>
        <li id="4" className={handleOutput(service.Q5G4)}>
          Portfolio management for pooled investment vehicles
        </li>
        <li id="5" className={handleOutput(service.Q5G5)}>
          Portfolio management for businesses (not small businesses) or
          institutional clients
        </li>
        <li id="6" className={handleOutput(service.Q5G6)}>
          Pension Consulting Services
        </li>
        <li id="7" className={handleOutput(service.Q5G7)}>
          Selection of Advisers (inc. private fund managers)
        </li>
        <li id="8" className={handleOutput(service.Q5G8)}>
          Publication of periodicals or newsletters
        </li>
        <li id="9" className={handleOutput(service.Q5G9)}>
          Security ratings or pricing services
        </li>
        <li id="10" className={handleOutput(service.Q5G10)}>
          Market timing services
        </li>
        <li id="11" className={handleOutput(service.Q5G11)}>
          Educational seminars/workshops
        </li>
        <li id="12" className={handleOutput(service.Q5G12)}>
          Other Services (Specified by Firm): {service.Q5G12Oth}
        </li>
      </ul>
    </>
  );
}
export default Services;
