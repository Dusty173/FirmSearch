import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import SECApi from "../SECapi";
import Gather from "../common/Gather";

function AdvisorDetail() {
  const [loaded, setLoaded] = useState(false);
  const { CrdNb } = useParams();
  const [firm, setFirm] = useState(null);
  // const [brochure, setBroch] = useState(null);
  useEffect(function getADVdata() {
    async function getFirm() {
      const firmRes = await SECApi.getByCrd(CrdNb);
      setFirm(firmRes[0]);
      setLoaded(true);
    }

    getFirm().then((data) => {
      setFirm(data);
      console.log("FIRM DATA", firm);
    });
    setLoaded(false);
  }, []);

  if (!loaded) return <Gather />;

  return (
    <>
      <div className="details">
        <h1></h1>
      </div>
    </>
  );
}

export default AdvisorDetail;
