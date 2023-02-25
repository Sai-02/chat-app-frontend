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
  const [messages, setMessages] = useState<any>([]);
  const activeChatID = useAppSelector((state) => state.chat.activeChatID);
  const chatMap = useAppSelector((state) => state.chat.chatMap);
  const activeChatMessages = useAppSelector(
    (state) => state.chat.activeChatMessages
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    setMessages(activeChatMessages);
  }, [activeChatMessages]);
  useEffect(() => {
    loadMessageOfActiveChat();
  }, [activeChatID]);
  useEffect(() => {
    if (activeChatID === "") return;
    const messageArray: any = chatMap[activeChatID];
    setMessages(messageArray);
  }, [chatMap]);
  const loadMessageOfActiveChat = async () => {
    if (activeChatID !== "") {
      if (Object.keys(chatMap).includes(activeChatID)) {
        const messageArray: any = chatMap.get(activeChatID);
        setMessages(messageArray);
        dispatch(chatActions.updateActiveChatMessages(messageArray));
        return;
      }
      setLoading(true);
      try {
        console.log("Why??");
        const data = await dispatch(
          chatActions.getMessageList({ chatID: activeChatID })
        );
        let messageArray = [];
        if (data.payload?.messages) messageArray = data.payload?.messages;
        setMessages(messageArray);
        dispatch(chatActions.updateActiveChatMessages(messageArray));
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
              {messages.map((message: any, index: number) => {
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
