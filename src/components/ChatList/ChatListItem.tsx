import React from "react";

const ChatListItem = () => {
  return (
    <div className="flex gap-4 p-4 cursor-pointer border">
      <div className="">
        <div className="w-12 h-12 rounded-full bg-[red]"></div>
      </div>
      <div className="flex-grow">
        <h2 className="text-left">Name of user</h2>
        <p className="text-left">Last message wasblah blah blah</p>
      </div>
    </div>
  );
};

export default ChatListItem;
