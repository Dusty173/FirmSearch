import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../forms/form.css";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import "./ADVcard.css";

function AdvisorCard(advisor) {
  console.log("ADV-CARD DATA:", advisor);
  const ADV = advisor;

  return (
    <>
      <div className="adv-card">
        <h3 className="adv-name">{ADV.advisor.Info.BusNm}</h3>
        <p className="adv-info">
          Location: {ADV.advisor.MainAddr.Strt1} {""}
          {ADV.advisor.MainAddr.City}, {ADV.advisor.MainAddr.State}
          <br />
          Most recent filing: {ADV.advisor.Filing[0].Dt}
        </p>
      </div>
    </>
  );
}

export default AdvisorCard;
