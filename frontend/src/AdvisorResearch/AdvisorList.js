import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import LoadIcon from "../common/LoadIcon";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import UserContext from "../Usercontext";
import AdvisorCard from "./AdvisorCard";

function AdvisorList() {
  const [advisors, setAdvisors] = useState(null);

  if (!advisors) return LoadIcon;

  return (
    <>
      {advisors.length ? (
        <div className="advisor-list">
          {advisors.map((a) => (
            <AdvisorCard
              busname={advisors.name}
              zipcode={advisors.postalcode}
              address={advisors.address}
            />
          ))}
        </div>
      ) : (
        <p className="no-result">No results found, please try again.</p>
      )}
    </>
  );
}

export default AdvisorList;
