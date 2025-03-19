import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import "./ADVcard.css";

function AdvisorCard(advisor) {
  console.log("ADV-CARD DATA:", advisor);
  const ADV = advisor;
  const CrdNb = ADV.advisor.Info.FirmCrdNb;
  const BusNm = ADV.advisor.Info.BusNm;
  const Strt1 = ADV.advisor.MainAddr.Strt1;
  const City = ADV.advisor.MainAddr.City;
  const State = ADV.advisor.MainAddr.State;
  const recentFile = ADV.advisor.Filing[0].Dt;

  console.log("-Business:", BusNm, "-CRD num:", CrdNb);

  return (
    <>
      <Link className="adv-card-link" to={`/advisordetail/${CrdNb}`}>
        <div className="adv-card">
          <h3 className="adv-name">{BusNm}</h3>
          <p className="adv-info">
            Location: {Strt1} {""}
            {City}, {State}
            <br />
            Most recent filing: {recentFile}
          </p>
        </div>
      </Link>
    </>
  );
}

export default AdvisorCard;
