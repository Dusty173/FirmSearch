import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";

function ResearchPage() {
  const [advisorData, setAdvisorData] = useState(null);

  return (
    <>
      <div className="search-div">
        <div className="search-bar">
          <input type="text"></input>
        </div>
      </div>
    </>
  );
}

export default ResearchPage;
