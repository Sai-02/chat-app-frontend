import React from "react";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  return (
    <div
      className="overflow-y-auto"
      style={{
        height: "calc(100vh - 60px)",
      }}
    >
      {[...Array(10)].map((val, index) => {
        return <ChatListItem key={index} />;
      })}
    </div>
  );
};

export default ChatList;
