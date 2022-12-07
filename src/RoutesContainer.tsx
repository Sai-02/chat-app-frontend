import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import { URL_PATHS } from "./utils/constant";
const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={""} />
        <Route path={URL_PATHS.SIGNUP} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesContainer;
