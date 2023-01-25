import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { chatActions } from "../../shared/redux/slices/chatSlice";
import ChatInput from "./ChatInput";
import ChatWindowLoading from "./ChatWindowLoading";
import Message from "./Message";
import NoChatSelected from "./NoChatSelected";
import NoMessageScreen from "./NoMessageScreen";

const ChatWindow = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const activeChatID = useAppSelector((state) => state.chat.activeChatID);
  const chatMap = useAppSelector((state) => state.chat.chatMap);
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadMessageOfActiveChat();
  }, [activeChatID]);
  const loadMessageOfActiveChat = async () => {
    if (activeChatID !== "") {
      console.log(chatMap);
      if (chatMap.has(activeChatID)) {
        const messageArray: any = chatMap.get(activeChatID);
        setMessages(messageArray);
        return;
      }
      setLoading(true);
      try {
        const data = await dispatch(
          chatActions.getMessageList({ chatID: activeChatID })
        );
        let messageArray = [];
        if (data.payload?.messages) messageArray = data.payload?.messages;
        setMessages(messageArray);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  };
  const isNoChatSelected = () => activeChatID === "";
  const isMessagesEmpty = () => messages.length === 0;
  return (
    <>
      <div
        className="flex flex-col p-6 gap-4 overflow-y-auto"
        style={{
          height: "calc(100vh - 132px)",
        }}
      >
        <>
          {isNoChatSelected() ? (
            <NoChatSelected />
          ) : loading ? (
            <ChatWindowLoading />
          ) : isMessagesEmpty() ? (
            <NoMessageScreen />
          ) : (
            <>
              {messages.map((message, index) => {
                return <Message key={index} messageInfo={message} />;
              })}
            </>
          )}
        </>
      </div>
      <ChatInput />
    </>
  );
};

export default ChatWindow;
