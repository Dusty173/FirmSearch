import React from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";

function Routing({ login, signup }) {
  const Navigate = useNavigate();

  const PrivateRoutes = () => {
    let auth = { token: true };
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
  };

  console.debug(
    "Routes",
    `login: ${typeof login}`,
    `register: ${typeof signup}`
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>

        <Route path="/login" element={<LoginForm login={login} />}></Route>

        <Route path="/signup" element={<SignupForm signup={signup} />}></Route>

        <Route element={<PrivateRoutes />}>
          {/* Add Admin routes here */}
        </Route>
      </Routes>
    </>
  );
}

export default Routing;
