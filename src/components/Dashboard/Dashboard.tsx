import React from "react";
import Header from "../Header/Header";

const Dashboard = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex-grow grid grid-cols-10">
        <div className="col-span-3 shadow">e</div>
        <div className="col-span-7">e</div>
      </div>
    </div>
  );
};

export default Dashboard;
