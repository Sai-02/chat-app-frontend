import React from "react";
import ChatInput from "./ChatInput";

const ChatWindow = () => {
  return (
    <>
      <div
        className="flex flex-col p-6 gap-4 overflow-y-auto"
        style={{
          height: "calc(100vh - 132px)",
        }}
      >
        {[...Array(10)].map((val, index) => {
          return (
            <div className={`text-black grid `}>
              <div
                className={`rounded-full  bg-[#6CB4EE] py-2 px-4 max-w-[60%] shadow ${
                  index % 2 == 0 ? "justify-self-start" : "justify-self-end"
                }`}
              >
                Hi Good morino
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput />
    </>
  );
};

export default ChatWindow;
