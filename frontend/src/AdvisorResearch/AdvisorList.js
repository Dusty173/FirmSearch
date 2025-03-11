import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import LoadIcon from "../common/LoadIcon";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import UserContext from "../Usercontext";
import AdvisorCard from "./AdvisorCard";

function AdvisorList(advisorData) {
  const [advisors, setAdvisors] = useState(null);

  if (!advisors) return LoadIcon;

  setAdvisors(advisorData);

  return (
    <>
      <p className="inclusion notes">
        Who is included: Independent Registered Investment Advisers, as per the
        SEC.
      </p>
      <p className="informative-notes">
        We pull our data directly from SEC filings, which are updated once
        <i>daily</i>, as well as all registered firms are required to update
        <i>annually</i>. If you believe any data is not correct, or is not being
        displayed properly, please contact {contactinfo} to correct any
        problems. Thank you!
      </p>

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
