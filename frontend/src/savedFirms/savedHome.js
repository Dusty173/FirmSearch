import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Usercontext";
import LoadIcon from "../common/LoadIcon";
import FirmSearchApi from "../Api";
import "./savedHome.css";

function SavedFirms() {
  const { currUser } = useContext(UserContext);
  const [firmList, setFirmList] = useState(null);
  const navigate = useNavigate();
  const data = currUser;
  useEffect(function getFirmsOnLoad() {
    loader();
  }, []);

  async function loader() {
    const firmInfo = await FirmSearchApi.getUserFirms(data);

    setFirmList(firmInfo);
  }

  async function handleDelete(firmid) {
    const data = {
      username: currUser.username,
      userId: currUser.id,
      id: firmid,
    };

    let deleted = await FirmSearchApi.deleteFirm(data);
    navigate(`/${currUser.username}/saved-firms`);
    return deleted;
  }

  let amount = firmList;

  return (
    <>
      <div className="firm-list">
        <h2>Saved Firms</h2>
        {firmList ? (
          <ul>
            {firmList.map((f) => (
              <>
                <Link
                  to={`/advisordetail/${f.firmcrd}`}
                  className="link"
                  target="blank"
                >
                  <div className="linkbox">
                    <li key={f.id} className="fname">
                      {f.firmname}
                    </li>
                    <li key={f.firmcrd} className="fcrd">
                      CRD: {f.firmcrd}
                    </li>
                  </div>
                </Link>
                <button
                  id={f.firmcrd}
                  onClick={() => handleDelete(f.id)}
                  className="delete-btn"
                >
                  Unsave {f.firmname}
                </button>
              </>
            ))}
          </ul>
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
}

export default SavedFirms;
