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
  const handleMessageRecievedFromServer =async (arg: any) => {
    await dispatch(chatActions.getChatList());
    const map = { ...chatMapRef.current };
    const message: any = arg.message;
    if (user?.chatList?.includes(message.chatID)) {
      const chatID = message.chatID;
      const arr: any = map[chatID];
      const newArr = [...arr, { ...arg }];
      map[chatID] = newArr;
      dispatch(chatActions.updateChatMap(map));
      if (activeChatID === message.chatID) {
        dispatch(chatActions.updateActiveChatMessages(map[chatID]));
      }
    } else {
    }
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
