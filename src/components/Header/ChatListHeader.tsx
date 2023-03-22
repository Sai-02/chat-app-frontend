import {
  faEllipsisVertical,
  faMessage,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CreateChatModal from "../../shared/components/modals/CreateChatModal";
import SearchUsersModal from "../../shared/components/modals/SearchUsersModal";

const ChatListHeader = () => {
  const [shouldOpenCreateChatModal, setShouldOpenCreateChatModal] =
    useState(false);
  const [shouldOpenSearchUsersModal, setShouldOpenSearchUsersModal] =
    useState(false);
  const openCreateChatModal = () => {
    setShouldOpenCreateChatModal(true);
  };
  const openSearchUsersModal = () => {
    setShouldOpenSearchUsersModal(true);
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
            icon={faUserPlus}
            className="cursor-pointer text-gray-500"
            onClick={openSearchUsersModal}
          />
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
      {shouldOpenSearchUsersModal ? (
        <SearchUsersModal
          open={shouldOpenSearchUsersModal}
          setOpen={setShouldOpenSearchUsersModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ChatListHeader;
