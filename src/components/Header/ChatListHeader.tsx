import {
  faEllipsisVertical,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ChatListHeader = () => {
  return (
    <div className="px-4 flex justify-between items-center ">
      <div className="">
        <div className="rounded-full w-10 h-10 bg-gray-200 grid place-items-center">
          <FontAwesomeIcon icon={faUser} className="text-[white]" />
        </div>
      </div>
      <div className="flex gap-6">
        <FontAwesomeIcon
          icon={faMessage}
          className="cursor-pointer text-gray-500"
        />
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="cursor-pointer text-gray-500"
        />
      </div>
    </div>
  );
};

export default ChatListHeader;
