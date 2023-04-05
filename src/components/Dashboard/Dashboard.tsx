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
  const chatList = useAppSelector((state) => state.chat.chatList);
  const isChatVisible = useAppSelector((state) => state.chat.isChatVisible);
  const user = useAppSelector((state) => state.auth.user);
  const chatMapRef = useRef(chatMap);
  const userChatListRef = useRef(chatList);

  const dispatch = useAppDispatch();
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    (async () => {
      await storeUserDetailsFromAuthToken();
    })();
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setScreenSize(window.innerWidth);
      });
    };
  }, []);
  useEffect(() => {
    userChatListRef.current = chatList;
  }, [chatList]);
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
    const userChatList = [...userChatListRef.current];
    for (let i = 0; i < userChatList.length; i++) {
      if (userChatList[i]._id === chatID) {
        return true;
      }
    }
    return false;
  };

  const handleChatListRecievedFromServer = (arg: any) => {
    dispatch(chatActions.updateChatList(arg?.chatList));
    dispatch(chatActions.updateChatListLength(arg?.chatList?.length));
    dispatch(chatActions.updatePersonalChatMap(arg?.personalChatMap));
  };
  return (
    <div className="h-screen w-screen flex flex-col ">
      <Header screenSize={screenSize} setScreenSize={setScreenSize} />
      <div className="flex-grow sm:grid sm:grid-cols-10  ">
        {screenSize > 640 ? (
          <>
            <div
              className="col-span-3  overflow-hidden"
              style={{
                height: "calc(100vh - 64px)",
              }}
            >
              <ChatList />
            </div>
            <div
              className="col-span-7 overflow-hidden  "
              style={{
                height: "calc(100vh - 64px)",
              }}
            >
              <ChatWindow />
            </div>
          </>
        ) : (
          <>
            {isChatVisible ? (
              <div
                className="overflow-hidden  "
                style={{
                  height: "calc(100vh - 64px)",
                }}
              >
                <ChatWindow />
              </div>
            ) : (
              <div
                className="overflow-hidden"
                style={{
                  height: "calc(100vh - 64px)",
                }}
              >
                <ChatList />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
