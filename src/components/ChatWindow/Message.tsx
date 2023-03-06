import React from "react";
import { useAppSelector } from "../../shared/redux/hooks";

interface IMessageComponentProps {
  messageInfo: any;
}
const Message = ({ messageInfo }: IMessageComponentProps) => {
  const user: any = useAppSelector((state) => state.auth.user);
  const isMessageSentByUser = () =>
    user?.username === messageInfo?.sender?.username;
  return (
    <div className={`text-black grid `}>
      <div
        className={`${
          isMessageSentByUser()
            ? "justify-self-end hidden"
            : "justify-self-start"
        }`}
      >
        {messageInfo?.sender?.name}
      </div>
      <div
        className={`rounded-full  bg-[#6CB4EE] py-2 px-4 max-w-[60%] shadow overflow-wrap-breakword ${
          isMessageSentByUser() ? "justify-self-end" : "justify-self-start"
        }`}
      >
        {messageInfo?.message?.text}
      </div>
    </div>
  );
};

export default Message;
