import React from "react";
import ChatList from "../ChatList/ChatList";
import ChatWindow from "../ChatWindow/ChatWindow";
import Header from "../Header/Header";

const Dashboard = () => {
  return (
    <div className="h-screen w-screen flex flex-col ">
      <Header />
      <div className="flex-grow grid grid-cols-10  ">
        <div
          className="col-span-3 shadow overflow-hidden"
          style={{
            height: "calc(100vh - 60px)",
          }}
        >
          <ChatList />
        </div>
        <div
          className="col-span-7 overflow-hidden border shadow"
          style={{
            height: "calc(100vh - 60px)",
          }}
        >
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
