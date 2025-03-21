import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SECApi from "../SECapi";
import Gather from "../common/Gather";
import Services from "./Services";

function AdvisorDetail() {
  const [firm, setFirm] = useState(null);
  const { CrdNb } = useParams();

  // const [brochure, setBroch] = useState(null);

  // Load firm data using CRD Number from request parameter
  useEffect(function getADVdata() {
    async function getFirm() {
      const firmRes = await SECApi.getByCrd(CrdNb);
      const advisor = firmRes.filings[0];
      setFirm(advisor);
    }

    getFirm();
  }, []);
  console.log("FIRM STATE", firm);

  if (!firm) return <Gather />;

  // Setting variables to shorten up data in returned HTML
  let site = firm.FormInfo.Part1A.Item1.WebAddrs.WebAddr;
  const location = firm.MainAddr;
  const service = firm.FormInfo.Part1A.Item5G;

  return (
    <>
      <div className="details">
        <h1 className="BusNm">{firm.Info.BusNm}</h1>
        <h3 className="location">
          {location.Strt1} {location.City}, {location.State} {location.PostlCd}
        </h3>
        <ul className="contact-list">
          <li>Phone: {firm.MainAddr.PhNb}</li>
          <li>
            Site:
            <a target="blank" href={site}>
              {site}
            </a>
          </li>
        </ul>
        <ul className="Info">
          <li>
            Staff Size: <b>{firm.FormInfo.Part1A.Item5A.TtlEmp}</b>
          </li>
          <li>
            Number of Offices(DBA or Branches):
            <b>{firm.FormInfo.Part1A.Item1.Q1F5}</b>
          </li>
          <li>
            Type of organization: <b>{firm.FormInfo.Part1A.Item3A.OrgFormNm}</b>
          </li>
        </ul>

        <div className="services-container">
          <h4 className="services-title">Advisory Services Offered:</h4>
          <Services service={service} />
        </div>
      </div>
    </>
  );
}

export default AdvisorDetail;
