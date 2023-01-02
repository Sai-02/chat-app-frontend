import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../shared/redux/hooks";
import { authActions } from "../../shared/redux/slices/authSlice";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const dispatch = useAppDispatch();
  const validateUserData = () => {
    if (name === "") {
      toast.error("Name can't be empty");
      return true;
    }
    if (password === "") {
      toast.error("Password can't be empty");
      return true;
    }
    if (email === "") {
      toast.error("Email can't be empty");
      return true;
    }
    if (username === "") {
      toast.error("Username can't be empty");
      return true;
    }
  };
  const registerUser = async () => {
    if (validateUserData()) return;
    try {
      dispatch(
        authActions.registerUser({
          email,
          name,
          password,
          username,
        })
      );
    } catch (e: any) {
      console.log(e);
      toast.error(e.response.data.msg);
      // toast.error("Something went wrong!!");
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
            Sign up
          </h1>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <label
                htmlFor=""
                className="text-left text-[14px] text-[#10182F] font-bold"
              >
                Name
              </label>
              <input
                type="text"
                className="rounded-[5px] border border-[#DAE1F5] outline-none px-4 py-[6px]"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <label
                htmlFor=""
                className="text-left text-[14px] text-[#10182F] font-bold"
              >
                Email
              </label>
              <input
                type="email"
                className="rounded-[5px] border border-[#DAE1F5] outline-none px-4 py-[6px]"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          </div>
          <div className="mt-[30px]">
            <button
              className="bg-[#10182F] text-white py-3 w-full rounded"
              onClick={registerUser}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-[35px] text-[#10182F] text-[14px]">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-[#306BF3] cursor-pointer">Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
