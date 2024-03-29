import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { chatActions } from "../../shared/redux/slices/chatSlice";
import ChatListItem from "./ChatListItem";
import ChatListItemLoading from "./ChatListItemLoading";

const ChatList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const chatList = useAppSelector((state) => state.chat.chatList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadChatsFromScratch();
  }, []);
  const loadChatsFromScratch = async () => {
    await dispatch(chatActions.getChatList());
    setIsLoading(false);
  };
  return (
    <div
      className="overflow-y-auto"
      style={{
        height: "calc(100vh - 60px)",
      }}
    >
      {isLoading ? (
        <>
          {[...Array(10)].map((val, index) => {
            return <ChatListItemLoading key={index} />;
          })}
        </>
      ) : (
        <>
          {chatList.length === 0 ? (
            <div className="h-full w-full grid place-items-center">
              No chats are there
            </div>
          ) : (
            <>
              {chatList.map((val: any) => {
                return (
                  <ChatListItem
                    key={val._id}
                    name={val.name}
                    latestMessage={val.latestMessage || ""}
                    id={val._id}
                    unreadMessageCount={val.unreadMessageCount}
                    isGroup={val.isGroup}
                    group_profile_pic={val.group_profile_pic}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChatList;
