import React from "react";

interface IChatListItemProps {
  key: string;
  name: string;
  latestMessage: string;
  id: string;
}
const ChatListItem = (props: IChatListItemProps) => {
  return (
    <div className="flex gap-4 p-4 cursor-pointer border">
      <div className="">
        <div className="w-12 h-12 rounded-full bg-[red]"></div>
      </div>
      <div className="flex-grow">
        <h2 className="text-left">{props.name}</h2>
        <p className="text-left">{props.latestMessage}</p>
      </div>
    </div>
  );
};

export default ChatListItem;
