import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SECApi from "../SECapi";
import Gather from "../common/Gather";
import Services from "./Services";
import Compensation from "./Compensation";
import Brochure from "./Brochure";
import AUM from "./AUM";
import Staff from "./Staff";
import Sites from "./Sites";
import SepAccounts from "./Custodians";
import MarketActivities from "./MarketActs";
import "./ADVdetail.css";

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
  let sites = firm.FormInfo.Part1A.Item1.WebAddrs.WebAddrs;
  const location = firm.MainAddr;
  const service = firm.FormInfo.Part1A.Item5G;
  const comp_Agrees = firm.FormInfo.Part1A.Item5E;
  const crdNb = firm.Info.FirmCrdNb;
  const totalAssets = firm.FormInfo.Part1A.Item5F.Q5F2C;
  const staff = firm.FormInfo.Part1A.Item5B;
  const totalStaff = firm.FormInfo.Part1A.Item5A.TtlEmp;
  const privateFunds = firm.FormInfo.Part1A.Item7B.Q7B;
  const busActs = firm.FormInfo.Part1A.Item6A;
  const passInfo = firm.FormInfo.Part1A;

  // Function for returning Investment firm registration type
  function firmReg({ firm }) {
    if (firm.ERA) return "Exempt Reporting Advisory Firm";
    if ((firm.Rgstn[0].Firmtype = "Registered"))
      return "SEC Registered Advisory Firm";
  }

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
            Registration Type:&nbsp;<b>{firmReg({ firm })}</b>
          </li>
        </ul>
        <ul className="Info">
          <li>
            Most recent Filing(YYYY-MM-DD):&nbsp;<b>{firm.Filing[0].Dt}</b>
          </li>
          <li>
            Alternate Offices(DBA or Branches):
            <b>&nbsp;{firm.FormInfo.Part1A.Item1.Q1F5}</b>
          </li>
          <li>
            Type of organization:&nbsp;
            <b>{firm.FormInfo.Part1A.Item3A.OrgFormNm}</b>
          </li>
          <li>
            Number of Accounts Managed:&nbsp;
            <b>
              {firm.FormInfo.Part1A.Item5F.Q5F2F ||
                "No regularly managed accounts reported"}
            </b>
          </li>
          <AUM totalAssets={totalAssets} />
        </ul>
        <div className="sites-div">
          <h4 className="sites-title">Sites:</h4>
          <Sites sites={sites} />
        </div>
        <Staff staff={staff} totalStaff={totalStaff} />
        <div className="managed-assets">
          <h4 className="comp-title">Compensation Agreements:</h4>
          <Compensation comp_Agrees={comp_Agrees} />
        </div>
        <div className="services-container">
          <h4 className="services-title">Advisory Services Offered:</h4>
          <Services service={service} />
        </div>
        <div className="market-container">
          <MarketActivities passInfo={passInfo} />
        </div>
        <div className="sep-accounts-container">
          <SepAccounts
            CrdNb={crdNb}
            PF={privateFunds}
            BusActs={busActs}
            otherInfo={passInfo}
          />
        </div>

        <div className="broch-container">
          <Brochure CrdNb={crdNb} />
        </div>
      </div>
    </>
  );
}

export default AdvisorDetail;
