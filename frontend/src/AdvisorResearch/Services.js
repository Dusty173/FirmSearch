import React, { useEffect, useState } from "react";
import "./Services.css";
import Gather from "../common/Gather";
import handleOutput from "../common/handleOutput";
import handleNum from "../common/handleNum";
import handleString from "../common/handleString";

function Services({ service, altService }) {
  return (
    <>
      <ul className="services">
        <li className={handleOutput(service.Q5G1)}>
          Financial Planning Services
        </li>
        <li className={handleOutput(service.Q5G2)}>
          Portfolio Management for Individuals and/or Small Businesses
        </li>
        <li className={handleOutput(service.Q5G3)}>
          Portfolio Management for Investment Companies
        </li>
        <li className={handleOutput(service.Q5G4)}>
          Portfolio management for pooled investment vehicles
        </li>
        <li className={handleOutput(service.Q5G5)}>
          Portfolio management for businesses (not small businesses) or
          institutional clients
        </li>
        <li className={handleOutput(service.Q5G6)}>
          Pension Consulting Services
        </li>
        <li className={handleOutput(service.Q5G7)}>
          Selection of Advisers (inc. private fund managers)
        </li>
        <li className={handleOutput(service.Q5G8)}>
          Publication of periodicals or newsletters
        </li>
        <li className={handleOutput(service.Q5G9)}>
          Security ratings or pricing services
        </li>
        <li className={handleOutput(service.Q5G10)}>Market timing services</li>
        <li className={handleOutput(service.Q5G11)}>
          Educational seminars/workshops
        </li>
        <li className={handleOutput(service.Q5G12)}>
          Other Services (Specified by Firm): {service.Q5G12Oth}
        </li>
      </ul>
      {altService.Q5H || altService.Q5HMT500 ? (
        <div>
          <h5>
            Amount of Clients Engaged For Financial Planning Services Last Year:
          </h5>
          <ul className="services">
            <li className={handleString(altService.Q5H)}>{altService.Q5H}</li>
            <li className={handleNum(altService.Q5HMT500)}>
              {altService.Q5HMT500}
            </li>
          </ul>
        </div>
      ) : (
        <span className="hidden"></span>
      )}
    </>
  );
}
export default Services;
