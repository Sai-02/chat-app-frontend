import React from "react";

interface IMessageComponentProps {
  messageInfo: any;
}
const Message = ({ messageInfo }: IMessageComponentProps) => {
  return (
    <div className={`text-black grid `}>
      <div
        className={`rounded-full  bg-[#6CB4EE] py-2 px-4 max-w-[60%] shadow ${
          2 % 2 == 0 ? "justify-self-start" : "justify-self-end"
        }`}
      >
        {messageInfo?.message?.text}
      </div>
    </div>
  );
};

export default Message;
