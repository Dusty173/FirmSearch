import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";

function ResearchPage() {
  return (
    <>
      <div className="firm-container">
        <h2 className="firm-title">{firmname}</h2>
      </div>
    </>
  );
}

export default ResearchPage;
