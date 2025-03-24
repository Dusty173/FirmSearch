import React, { useEffect, useState } from "react";
import "./Services.css";
import Gather from "../common/Gather";
import axios from "axios";

function Brochure({ CrdNb }) {
  const [brochure, setBroch] = useState(null);
  console.log("Brochure CRD:", CrdNb);

  return (
    <>
      <div className="brochure"></div>
    </>
  );
}

export default Brochure;
