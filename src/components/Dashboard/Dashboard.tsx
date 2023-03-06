import React, { useEffect, useRef, useState } from "react";
import ChatList from "../ChatList/ChatList";
import ChatWindow from "../ChatWindow/ChatWindow";
import Header from "../Header/Header";
import jwtDecode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { getAccessToken } from "../../shared/utils/helpers";
import authSlice, { authActions } from "../../shared/redux/slices/authSlice";
import io from "socket.io-client";
import { SOCKET_EVENTS } from "../../shared/utils/constant";
import { chatActions } from "../../shared/redux/slices/chatSlice";

export const socket = io("http://localhost:5000/");
const Dashboard = () => {
  const chatMap = useAppSelector((state) => state.chat.chatMap);
  const activeChatID = useAppSelector((state) => state.chat.activeChatID);
  const user = useAppSelector((state) => state.auth.user);
  const chatMapRef = useRef(chatMap);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      await storeUserDetailsFromAuthToken();
    })();
  }, []);
  useEffect(() => {
    chatMapRef.current = chatMap;
  }, [chatMap]);
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      socket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log("connected");
      });
      socket.on(SOCKET_EVENTS.RECIEVE_MESSAGE, (arg) => {
        handleMessageRecievedFromServer(arg);
      });
      socket.on(SOCKET_EVENTS.GET_CHAT_LIST, (arg) => {
        handleChatListRecievedFromServer(arg);
      });
      return () => {
        socket.off(SOCKET_EVENTS.CONNECT);
        socket.off(SOCKET_EVENTS.RECIEVE_MESSAGE);
      };
    }
  }, [user]);

  const storeUserDetailsFromAuthToken = async () => {
    const userDetails: object = await jwtDecode(getAccessToken());
    dispatch(authActions.setUser(userDetails));
  };
  const handleMessageRecievedFromServer = async (arg: any) => {
    await dispatch(chatActions.getChatList());
    const map = { ...chatMapRef.current };
    const message: any = arg.message;
    console.log(user.chatList, message, "message recieved");
    if (isUserInTheChat(message.chatID)) {
      const chatID = message.chatID;
      const arr: any = map[chatID];
      const newArr = [...arr, { ...arg }];
      map[chatID] = newArr;
      dispatch(chatActions.updateChatMap(map));
      if (activeChatID === message.chatID) {
        socket.emit(SOCKET_EVENTS.MARK_AS_READ, {
          authToken: getAccessToken(),
          chatID: activeChatID,
        });
        dispatch(chatActions.updateActiveChatMessages(map[chatID]));
      }
    } else {
    }
  };
  const isUserInTheChat = (chatID: any) => {
    for (let i = 0; i < user.chatList.length; i++) {
      if (user.chatList[i].id === chatID) {
        return true;
      }
    }
    return false;
  };

  const handleChatListRecievedFromServer = (arg: any) => {
    dispatch(chatActions.updateChatList(arg?.chats));
    dispatch(chatActions.updateChatListLength(arg?.size));
  };
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
