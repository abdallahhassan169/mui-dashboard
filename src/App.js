import React, { useState, useEffect, useMemo } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import SettingsIcon from "@mui/icons-material/Settings";
import MDBox from "components/MDBox";

import Sidenav from "MainWidgets/Sidenav";
import Configurator from "components/Configurator";

import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import SignIn from "layouts/authentication/sign-in";
import routes from "./routes";
import Dashboard from "./layouts/dashboard/index";

import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "./context/index";

import brandWhite from "./assets/images/logo-ct.png";
import brandDark from "./assets/images/logo-ct-dark.png";
import { AuthContext } from "context/AuthContext";
import * as utils from "./services/utils.js";
import { Button, styled } from "@mui/material";
import "./styles.css";
import { NotificationContainer } from "react-notifications";
import { useCookies } from "react-cookie";
import { green, red } from "@mui/material/colors";

export default function App() {
  const [cookies, setCookie] = useCookies();
  const [users, setCurrentUser] = useState(cookies.user);
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    token,
    user,
  } = controller;
  // const a = AuthContext();

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [showLoaderFlag, setShowLoaderFlag] = React.useState(0);
  const callBacks = [];
  let locked = false;
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };
  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <SettingsIcon fontSize="small" color="inherit"></SettingsIcon>
    </MDBox>
  );
  const logout = async () => {
    setCurrentUser(null);
    setCookie("user", null);
  };
  console.log(cookies, "kkkk");

  const onLogin = (userData, rememberMe, token, expiration) => {
    setCookie("token", token, {
      maxAge: expiration,
    });
    if (rememberMe) {
      setCookie("user", userData, {
        maxAge: expiration,
      });
    }
    setCurrentUser({ ...userData, token });
  };
  return users?.token ? (
    <AuthContext.Provider
      value={{
        user,
        logout,
      }}
    >
      {direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
            <CssBaseline />
            {layout === "dashboard" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  routes={routes}
                  logos={{ white: brandWhite, dark: brandDark }}
                  logout={logout}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
            <NotificationContainer />
          </ThemeProvider>
        </CacheProvider>
      ) : (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                logos={{ white: brandWhite, dark: brandDark }}
                routes={routes}
                logout={logout}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          {layout === "vr" && <Configurator />}
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
          <NotificationContainer />
        </ThemeProvider>
      )}
    </AuthContext.Provider>
  ) : (
    <>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        <SignIn setUser={onLogin} />
        <NotificationContainer />
      </ThemeProvider>
    </>
  );
}
/* 
const Apps = () => {
  const [user, setCurrentUser] = React.useState();
  const [CurrentDep, setCurrentDep] = React.useState(null);
  const [showLoaderFlag, setShowLoaderFlag] = React.useState(0);
  const callBacks = [];
  let locked = false;
  /* This Method For Concurrency Handling to change the loader counter in case of more than one loader required to show  
  const execLoader = (callBackFunction) => {
    callBacks.push(callBackFunction);
    if (locked) return;
    locked = true;
    while (callBacks.length > 0) {
      const method = callBacks.pop();
      method();
    }
    locked = false;
  };
  const showLoader = () => {
    execLoader(() => {
      setShowLoaderFlag(showLoaderFlag + 1);
    });
  };
  const hideLoader = () => {
    execLoader(() => {
      setShowLoaderFlag(showLoaderFlag > 0 ? showLoaderFlag - 1 : 0);
    });
  };
  utils.registerLoaderFunctions(showLoader, hideLoader);
  React.useEffect(() => {}, [CurrentDep]);
  const logout = async () => {
    // window.location.href = "/";
    setCurrentUser(null);
  };
  const HandleDepartmentChange = (dep) => {
    // //console.log("STARTUOP  >>>" + dep);
  };
  const onLogin = async (userData) => {
    setCurrentUser(userData);
  };
  return (
    <UIContext.Provider
      value={{
        showLoaderFlag: showLoaderFlag,
        showLoader: showLoader,
        hideLoader: hideLoader,
      }}
    >
     
    </UIContext.Provider>
  );
}; 
 */
