import React from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Homepage from "./hompage/Home";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/Signupform";
import HomeForm from "./forms/EditHome";
import AboutForm from "./forms/EditAbout";
import Aboutpage from "./aboutpage/About";
import AdvisorList from "./AdvisorResearch/AdvisorList";
import AdvisorDetail from "./AdvisorResearch/AdvisorDetail";

function Routing({ login, signup, data }) {
  const Navigate = useNavigate();

  const PrivateRoutes = () => {
    let auth = { token: true };
    return auth.token ? <Outlet /> : <Navigate to="/" />;
  };

  // console.debug(
  //   "Routes",
  //   `login: ${typeof login}`,
  //   `register: ${typeof signup}`
  // );

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>

        <Route path="/login" element={<LoginForm login={login} />}></Route>

        <Route path="/signup" element={<SignupForm signup={signup} />}></Route>

        <Route path="/aboutus" element={<Aboutpage />}></Route>

        <Route path="/advisorlist" element={<AdvisorList data={data} />} />

        <Route path="/advisordetail/:CrdNb" element={<AdvisorDetail />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/updabout" element={<AboutForm />} />
          <Route path="/updhome" element={<HomeForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default Routing;
