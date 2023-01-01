import React from "react";
import { Toaster } from "react-hot-toast";
import logo from "./logo.svg";
import RoutesContainer from "./RoutesContainer";

function App() {
  return (
    <div className="text-center">
      <Toaster />
      <RoutesContainer />
    </div>
  );
}

export default App;
