import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import GuestComponent from "./shared/components/GuestComponent";
import ProtectedComponent from "./shared/components/ProtectedComponent";
import { URL_PATHS } from "./shared/utils/constant";
const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={URL_PATHS.SIGNUP}
          element={<GuestComponent element={<Signup />} />}
        />
        <Route
          path={URL_PATHS.LOGIN}
          element={<GuestComponent element={<Login />} />}
        />
        <Route
          path={URL_PATHS.DASHBOARD}
          element={<ProtectedComponent element={<Dashboard />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesContainer;
