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
import ExpPage from "./InfoPages/ADVexp";
import ReviewPage from "./reviewpages/ReviewHome";
import ReviewDetails from "./reviewpages/ReviewDetails";
import ResourcePage from "./resourcepages/ResourceHome";
import ReviewForm from "./forms/AddReview";
import ResourceForm from "./forms/AddResource";
import ResourceDetail from "./resourcepages/ResourceDetail";
import AdminHome from "./Adminpages/Adminhome";
import SavedFirms from "./savedFirms/savedHome";

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

        <Route path="/explain-adv" element={<ExpPage />} />

        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/reviews/:id" element={<ReviewDetails />} />

        <Route path="/resources" element={<ResourcePage />} />
        <Route path="/resources/:id" element={<ResourceDetail />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/updabout" element={<AboutForm />} />
          <Route path="/updhome" element={<HomeForm />} />
          <Route path="/addreviewform" element={<ReviewForm />} />
          <Route path="/addresourceform" element={<ResourceForm />} />
          <Route path="/a-home" element={<AdminHome />} />
          <Route path="/:username/saved-firms" element={<SavedFirms />} />
        </Route>
      </Routes>
    </>
  );
}

export default Routing;
