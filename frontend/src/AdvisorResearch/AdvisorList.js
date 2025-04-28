import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "../forms/form.css";
import LoadIcon from "../common/LoadIcon";
import Alert from "../common/Alert";
import FirmSearchApi from "../Api";
import UserContext from "../Usercontext";
import AdvisorCard from "./AdvisorCard";

function AdvisorList({ data }) {
  const [advisors, setAdvisors] = useState(null);

  useEffect(function setStateOnLoad() {
    loader();
  }, []);

  async function loader() {
    setAdvisors(data);
  }

  if (!advisors) return <LoadIcon />;
  // console.log(advisors);
  return (
    <>
      {advisors.length ? (
        <div className="advisor-list">
          <ul>
            {advisors.map((a) => (
              <li key={a.Info.FirmCrdNb}>
                <AdvisorCard advisor={a} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2 className="no-res">No results found, please try again.</h2>
      )}
    </>
  );
}

export default AdvisorList;
