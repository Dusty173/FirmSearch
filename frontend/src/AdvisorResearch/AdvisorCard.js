import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import AUMCard from "./AUMcard";
import "./ADVcard.css";

function AdvisorCard(advisor) {
  // console.log("ADV-CARD DATA:", advisor);

  // Set variables for easy access:

  const ADV = advisor;
  const CrdNb = ADV.advisor.Info.FirmCrdNb;
  const BusNm = ADV.advisor.Info.BusNm;
  const City = ADV.advisor.MainAddr.City;
  const State = ADV.advisor.MainAddr.State;
  const totalAssets = ADV.advisor.FormInfo.Part1A.Item5F.Q5F2C;

  // Address variables if only has PO box:
  const PoBox = ADV.advisor.MailingAddr.Strt1;
  const PoState = ADV.advisor.MailingAddr.State;
  const PoCity = ADV.advisor.MailingAddr.City;
  const PoZip = ADV.advisor.MailingAddr.PostlCd;
  // console.log("-Business:", BusNm, "-CRD num:", CrdNb);

  return (
    <>
      {!City && !PoCity ? (
        <Link
          className="adv-card-link"
          to={`/advisordetail/${CrdNb}`}
          target="blank"
        >
          <div className="adv-card">
            <h3 className="adv-name">{BusNm}</h3>
            <p className="no-res">No Mailing/Street Address Filed!</p>
            <small className="adv-info">
              <AUMCard totalAssets={totalAssets} />
            </small>
          </div>
        </Link>
      ) : (
        <Link
          className="adv-card-link"
          to={`/advisordetail/${CrdNb}`}
          target="blank"
        >
          <div className="adv-card">
            <h3 className="adv-name">{BusNm}</h3>
            {ADV.advisor.MainAddr.Strt1 ? (
              <p className="adv-info">
                Location: {""}
                {City}, {State}
                <br />
                <small className="adv-info">
                  <AUMCard totalAssets={totalAssets} />
                </small>
              </p>
            ) : (
              <p className="adv-info">
                <small className="no-res">No street address found</small>
                <br />
                {PoBox}&nbsp;
                {PoCity},&nbsp;
                {PoState}&nbsp;
                {PoZip}
                <br />
                <small className="adv-info">
                  <AUMCard totalAssets={totalAssets} />
                </small>
              </p>
            )}
          </div>
        </Link>
      )}
    </>
  );
}

export default AdvisorCard;
