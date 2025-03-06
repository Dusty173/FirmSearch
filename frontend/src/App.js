import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./navbar/Navbar";
import Routes from "./Routes";
import InitLoad from "./common/InitialLoad";
import FirmSearchApi from "./Api";
import UserContext from "./Usercontext";
import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "FS-token";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  console.debug("App:", "loaded:", loaded, "User:", currUser, "token:", token);

  useEffect(
    function loadUser() {
      console.debug("App useEffect loadUser", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);

            FirmSearchApi.token = token;

            let currentUser = await FirmSearchApi.getCurrentUser(username);
            setCurrUser(currentUser);
          } catch (err) {
            console.error("App: loadUser: Problem loading", err);
            setCurrUser(null);
          }
        }
        setLoaded(true);
      }
      setLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  function logout() {
    setCurrUser(null);
    setToken(null);
  }

  async function signup(signup) {
    try {
      let token = await FirmSearchApi.signup(signup);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("Signup failed", err);
      return { success: false, err };
    }
  }

  async function login(loginData) {
    try {
      let token = await FirmSearchApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("Login failed", err);
      return { success: false, err };
    }
  }

  if (!loaded) return <InitLoad />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currUser, setCurrUser }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
