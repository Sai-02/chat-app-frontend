import React, { useEffect } from "react";
import ChatList from "../ChatList/ChatList";
import ChatWindow from "../ChatWindow/ChatWindow";
import Header from "../Header/Header";
import jwtDecode from "jwt-decode";
import { useAppDispatch } from "../../shared/redux/hooks";
import { getAccessToken } from "../../shared/utils/helpers";
import { authActions } from "../../shared/redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    storeUserDetailsFromAuthToken();
  }, []);

  const storeUserDetailsFromAuthToken = async () => {
    const userDetails: object = await jwtDecode(getAccessToken());
    dispatch(authActions.setUser(userDetails));
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
