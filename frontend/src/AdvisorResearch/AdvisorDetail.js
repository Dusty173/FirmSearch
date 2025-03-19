import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import SECApi from "../SECapi";
import Gather from "../common/Gather";

function AdvisorDetail() {
  const [firm, setFirm] = useState(null);
  const { CrdNb } = useParams();

  // const [brochure, setBroch] = useState(null);
  useEffect(function getADVdata() {
    async function getFirm() {
      const firmRes = await SECApi.getByCrd(CrdNb);
      const advisor = firmRes.filings[0];
      setFirm(advisor);
    }

    getFirm();
    console.log("FIRM STATE", firm);
  }, []);

  if (!firm) return <Gather />;

  let WebArr = firm.FormInfo.Part1A.Item1.WebAddrs.WebAddrs;

  WebArr.forEach((e) => {
    <div>{e}</div>;
    console.log(e);
  });

  console.log("WEBS", WebArr);

  return (
    <>
      <div className="details">
        <h1>{firm.Info.BusNm}</h1>
        <h3>
          {firm.MainAddr.Strt1} {firm.MainAddr.City}, {firm.MainAddr.State}{" "}
          {firm.MainAddr.PostlCd}
        </h3>
        <ul>
          <li>Phone: {firm.MainAddr.PhNb}</li>
          {WebArr}
        </ul>
      </div>
    </>
  );
}

export default AdvisorDetail;
