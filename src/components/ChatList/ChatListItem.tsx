import React from "react";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { chatActions } from "../../shared/redux/slices/chatSlice";
import { SOCKET_EVENTS } from "../../shared/utils/constant";
import { getAccessToken } from "../../shared/utils/helpers";
import { socket } from "../Dashboard/Dashboard";
import Tooltip from "@mui/material/Tooltip";
interface IChatListItemProps {
  key: string;
  name: string;
  latestMessage: string;
  id: string;
  unreadMessageCount: number;
}
const ChatListItem = (props: IChatListItemProps) => {
  const activeChatID = useAppSelector((state) => state.chat.activeChatID);
  const dispatch = useAppDispatch();
  const setActiveChat = () => {
    dispatch(chatActions.updateActiveChatID(props.id));
  };
  const handleChatListItemClick = () => {
    setActiveChat();
    socket.emit(SOCKET_EVENTS.MARK_AS_READ, {
      authToken: getAccessToken(),
      chatID: props.id,
    });
  };
  return (
    <div
      className={`flex gap-4 p-4 cursor-pointer border hover:bg-[#f5f6f6] ${
        activeChatID === props.id ? "bg-[#f0f2f5] hover:bg-[#f0f2f5]" : ""
      }`}
      onClick={handleChatListItemClick}
    >
      <div className="">
        <div className="w-12 h-12 rounded-full bg-[red]"></div>
      </div>
      <div className="flex-grow max-w-full overflow-hidden">
        <h2 className="text-left text-ellipsis">{props.name}</h2>
        <Tooltip title={props.latestMessage} placement="bottom-start">
          <p className="text-left text-ellipsis overflow-hidden  ">
            {props.latestMessage}
          </p>
        </Tooltip>
      </div>
      {props.unreadMessageCount > 0 ? (
        <div className="flex items-center">
          <div className="rounded-full text-white bg-[#1976D2]  text-xs w-[20px] h-[20px] flex items-center justify-center">
            {props.unreadMessageCount}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChatListItem;
