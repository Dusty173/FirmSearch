import React, { useEffect, useState } from "react";

import Gather from "../common/Gather";

function Services({ service }) {
  // Function for returning a boolean for service info, may use to return a check/x OR hide false values.
  function handleOutput(string) {
    if (string == "Y") return "Yes";
    return "No";
  }

  return (
    <>
      <ul className="services">
        <li id="1">
          Financial Planning Services: {handleOutput(service.Q5G1)}
        </li>
        <li id="2">
          Portfolio Management for Individuals or Small Businesses:{" "}
          {handleOutput(service.Q5G2)}
        </li>
        <li id="3">
          Portfolio Management for Investment Companies:{" "}
          {handleOutput(service.Q5G3)}
        </li>
        <li id="4">
          {" "}
          Portfolio management for businesses (not small businesses) or
          institutional clients: {handleOutput(service.Q5G4)}
        </li>
      </ul>
    </>
  );
}
export default Services;
