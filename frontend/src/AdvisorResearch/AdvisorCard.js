import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import "./ADVcard.css";

function AdvisorCard(advisor) {
  // console.log("ADV-CARD DATA:", advisor);
  const ADV = advisor;
  const CrdNb = ADV.advisor.Info.FirmCrdNb;
  const BusNm = ADV.advisor.Info.BusNm;
  const Strt1 = ADV.advisor.MainAddr.Strt1;
  const City = ADV.advisor.MainAddr.City;
  const State = ADV.advisor.MainAddr.State;
  const recentFile = ADV.advisor.Filing[0].Dt;

  // Address if only has PO box:
  const PoBox = ADV.advisor.MailingAddr.Strt1;
  const PoState = ADV.advisor.MailingAddr.State;
  const PoCity = ADV.advisor.MailingAddr.City;
  const PoZip = ADV.advisor.MailingAddr.PostlCd;
  // console.log("-Business:", BusNm, "-CRD num:", CrdNb);

  return (
    <>
      {!City && !PoCity ? (
        <Link className="adv-card-link" to={`/advisordetail/${CrdNb}`}>
          <div className="adv-card">
            <h3 className="adv-name">{BusNm}</h3>
            <p className="no-res">No Mailing/Street Address Filed!</p>
            <p className="adv-info">Most recent filing: {recentFile}</p>
          </div>
        </Link>
      ) : (
        <Link className="adv-card-link" to={`/advisordetail/${CrdNb}`}>
          <div className="adv-card">
            <h3 className="adv-name">{BusNm}</h3>
            {ADV.advisor.MainAddr.Strt1 ? (
              <p className="adv-info">
                Location: {Strt1} {""}
                {City}, {State}
                <br />
                Most recent filing: {recentFile}
              </p>
            ) : (
              <p className="adv-info">
                <small className="nostrt">No street address found</small>
                <br />
                {PoBox}&nbsp;
                {PoCity},&nbsp;
                {PoState}&nbsp;
                {PoZip}
                <br />
                Most recent filing: {recentFile}
              </p>
            )}
          </div>
        </Link>
      )}
    </>
  );
}

export default AdvisorCard;
