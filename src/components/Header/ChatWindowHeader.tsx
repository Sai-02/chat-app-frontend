import {
  faEllipsisVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../shared/redux/hooks";

const ChatWindowHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState("");
  const [activeChat, setActiveChat] = useState<any>({});
  const isNoChatSelected = () => {
    return activeChatID.trim() === "";
  };
  const activeChatID = useAppSelector((state) => state.chat.activeChatID);
  const chatList = useAppSelector((state) => state.chat.chatList);
  useEffect(() => {
    if (!isNoChatSelected()) {
      updateGroupNameAndMembers();
    }
  }, [activeChatID]);

  const updateGroupNameAndMembers = () => {
    const [activeChat, ...x] = chatList.filter(
      (chat) => chat._id === activeChatID
    );
    setActiveChat(activeChat);
    setGroupName(activeChat.name);
    setGroupMembers(activeChat.members.join(", "));
  };
  const getParsedName = (name: any) => {
    const arr = name.split("+");
    if (arr[0] === user.username) return arr[1];
    return arr[0];
  };
  return (
    <div className="">
      {isNoChatSelected() ? (
        <div className=""></div>
      ) : (
        <div className="bg-gray-100 px-4 pr-6 flex justify-between items-center py-3 bg-gray-100 ">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-sky-100"></div>
            <div className="text-left">
              <h3 className="text-sm font-semibold">
                {activeChat.isGroup ? (
                  <>{groupName}</>
                ) : (
                  <>{getParsedName(groupName)}</>
                )}
              </h3>
              <p className="text-xs truncate">
                {activeChat.isGroup ? <>{groupMembers}</> : <></>}
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <FontAwesomeIcon
              icon={faSearch}
              className="cursor-pointer text-gray-500"
            />
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="cursor-pointer text-gray-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindowHeader;
