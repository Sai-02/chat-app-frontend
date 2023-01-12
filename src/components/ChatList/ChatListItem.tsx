import React from "react";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { chatActions } from "../../shared/redux/slices/chatSlice";

interface IChatListItemProps {
  key: string;
  name: string;
  latestMessage: string;
  id: string;
}
const ChatListItem = (props: IChatListItemProps) => {
  const activeChatID = useAppSelector((state) => state.chat.activeChatID);
  const dispatch = useAppDispatch();
  const setActiveChat = () => {
    dispatch(chatActions.updateActiveChatID(props.id));
  };
  return (
    <div
      className={`flex gap-4 p-4 cursor-pointer border hover:bg-[#f5f6f6] ${
        activeChatID === props.id ? "bg-[#f0f2f5] hover:bg-[#f0f2f5]" : ""
      }`}
      onClick={setActiveChat}
    >
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
