import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Usercontext";
import FirmSearchApi from "../Api";
import LoadIcon from "../common/LoadIcon";
import "./Adminhome.css";

function AdminHome() {
  const { currUser } = useContext(UserContext);
  const [userList, setUserList] = useState(null);

  useEffect(function getUsersOnLoad() {
    loader();
  }, []);

  async function loader() {
    const res = await FirmSearchApi.getUserList();
    // console.log(res);
    setUserList(res);
  }

  if (!userList) return <LoadIcon />;

  return (
    <>
      <div>
        <h1>Admin page</h1>
        <div className="user-list">
          <ul>
            {userList.map((u) => (
              <div className="user-container">
                <li>
                  <b>Username:</b> {u.username}
                </li>
                <li>
                  <b>First:</b> {u.firstname}
                </li>
                <li>
                  <b>Last:</b> {u.lastname}
                </li>
                <li>
                  <b>Email:</b> {u.email}
                </li>
                <li>
                  <b>Privileges:</b>{" "}
                  {u.is_admin ? "Administrator" : "User only"}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
