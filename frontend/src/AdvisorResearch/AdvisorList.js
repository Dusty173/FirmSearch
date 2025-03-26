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

  return (
    <>
      {advisors.length ? (
        <div className="advisor-list">
          <ul>
            {advisors.map((a) => (
              <li key={a.Filing.Dt}>
                <AdvisorCard advisor={a} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No results found, please try again.</div>
      )}
    </>
  );
}

export default AdvisorList;
