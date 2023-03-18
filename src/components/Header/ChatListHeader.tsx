import {
  faEllipsisVertical,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CreateChatModal from "../../shared/components/modals/CreateChatModal";

const ChatListHeader = () => {
  const [shouldOpenCreateChatModal, setShouldOpenCreateChatModal] =
    useState(false);
  const openCreateChatModal = () => {
    setShouldOpenCreateChatModal(true);
  };
  return (
    <>
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
            onClick={openCreateChatModal}
          />
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="cursor-pointer text-gray-500"
          />
        </div>
      </div>
      {shouldOpenCreateChatModal ? (
        <CreateChatModal
          open={shouldOpenCreateChatModal}
          setOpen={setShouldOpenCreateChatModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ChatListHeader;
