import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { chatActions } from "../../shared/redux/slices/chatSlice";
import { SOCKET_EVENTS } from "../../shared/utils/constant";
import { getAccessToken } from "../../shared/utils/helpers";
import { socket } from "../Dashboard/Dashboard";

const ChatInput = () => {
  const dispatch = useAppDispatch();
  const activeChatID = useAppSelector((state) => state.chat.activeChatID);
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    if (message.trim() === "") return;
    // const res = await dispatch(
    //   chatActions.sendMessage({
    //     chatID: activeChatID,
    //     text: message,
    //   })
    // );
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
      chatID: activeChatID,
      text: message,
      authToken: getAccessToken(),
    });
    setMessage("");
  };
  const isChatSelected = () => activeChatID !== "";
  return (
    <>
      {isChatSelected() ? (
        <div className="p-4 bg-[#f0f2f5] flex gap-4">
          <input
            type="text"
            className="rounded px-4 py-2 outline-none w-full flex-grow"
            placeholder="Enter text here"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <div
            className="w-[40px] h-[40px] cursor-pointer rounded-full flex items-center bg-[#6CB4EE] justify-center "
            onClick={sendMessage}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-[white]" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ChatInput;
