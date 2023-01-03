import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../shared/redux/hooks";
import { authActions } from "../../shared/redux/slices/authSlice";
import { URL_PATHS } from "../../shared/utils/constant";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginUser = async () => {
    if (validateUserData()) return;
    try {
      await dispatch(
        authActions.loginUser({
          password,
          username,
        })
      );
      toast.success("Logged in   !!");
      navigate(URL_PATHS.DASHBOARD);
    } catch (e: any) {
      console.log(e);
    }
  };
  const validateUserData = () => {
    if (username.trim() === "") {
      toast.error("Username can't be empty");
      return true;
    }
    if (password.trim() === "") {
      toast.error("Password can't be empty");
      return true;
    }
  };
  return (
    <div
      className="text-center w-screen h-screen"
      style={{
        background: "linear-gradient(119.36deg, #F3F7FF 0%, #FEE2F6 100%)",
      }}
    >
      <div className="h-screen w-screen flex bg-[white] xs:bg-[transparent] xs:items-center justify-center">
        <div className="bg-white rounded p-4  xs:p-8 xs:shadow xs:w-[400px]">
          <h1 className="text-center text-[#10182F] font-bold text-[1.2rem] mb-[2rem] ">
            Sign in
          </h1>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <label
                htmlFor=""
                className="text-left text-[14px] text-[#10182F] font-bold"
              >
                Username
              </label>
              <input
                type="text"
                className="rounded-[5px] border border-[#DAE1F5] outline-none px-4 py-[6px]"
                placeholder="Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <label
                htmlFor=""
                className="text-left text-[14px] text-[#10182F] font-bold"
              >
                Password
              </label>
              <input
                type="password"
                className="rounded-[5px] border border-[#DAE1F5] outline-none px-4 py-[6px]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-[30px]">
            <button
              className="bg-[#10182F] text-white py-3 w-full rounded"
              onClick={loginUser}
            >
              Sign in
            </button>
          </div>
          <div className="mt-[35px] text-[#10182F] text-[14px]">
            Don't have account?{" "}
            <Link to={URL_PATHS.SIGNUP}>
              <span className="text-[#306BF3] cursor-pointer">Create</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
