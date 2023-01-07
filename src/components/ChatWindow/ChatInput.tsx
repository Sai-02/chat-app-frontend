import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ChatInput = () => {
  return (
    <div className="p-4 bg-[#f0f2f5] flex gap-4">
      <input
        type="text"
        className="rounded px-4 py-2 outline-none w-full flex-grow"
        placeholder="Enter text here"
      />
      <div className="w-[40px] h-[40px] cursor-pointer rounded-full flex items-center bg-[#6CB4EE] justify-center ">
        <FontAwesomeIcon icon={faPaperPlane} className="text-[white]" />
      </div>
    </div>
  );
};

export default ChatInput;
