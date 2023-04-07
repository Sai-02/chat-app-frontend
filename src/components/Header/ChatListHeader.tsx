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
import Menu from "@mui/material/Menu";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { authActions } from "../../shared/redux/slices/authSlice";
import { chatActions } from "../../shared/redux/slices/chatSlice";
import { deleteAccessToken } from "../../shared/utils/helpers";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { URL_PATHS } from "../../shared/utils/constant";
import ProfilePicModal from "../../shared/components/modals/ProfilePicModal";
const ChatListHeader = () => {
  const [shouldOpenCreateChatModal, setShouldOpenCreateChatModal] =
    useState(false);
  const [shouldOpenSearchUsersModal, setShouldOpenSearchUsersModal] =
    useState(false);
  const [logoutMenuTarget, setLogoutMenuTarget] = useState<null | HTMLElement>(
    null
  );
  const [shouldOpenProfilePicModal, setShouldOpenProfilePicModal] =
    useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const open = Boolean(logoutMenuTarget);
  const openCreateChatModal = () => {
    setShouldOpenCreateChatModal(true);
  };
  const openSearchUsersModal = () => {
    setShouldOpenSearchUsersModal(true);
  };

  const openLogoutMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLogoutMenuTarget(event.currentTarget);
  };
  const closeLogoutMenu = () => {
    setLogoutMenuTarget(null);
  };
  const handleLogOut = () => {
    deleteAccessToken();
    dispatch(authActions.resetState());
    dispatch(chatActions.resetState());
    closeLogoutMenu();
    toast.success("Logged out !");
    navigate(URL_PATHS.LOGIN);
  };
  const isProfilePictureValid = () => {
    return user?.profile_img?.trim() !== "";
  };
  const openProfilePicMOdal = () => {
    setShouldOpenProfilePicModal(true);
  };
  return (
    <>
      <div className="px-4 flex justify-between items-center ">
        <div className="">
          <div className="rounded-full w-10 h-10 bg-gray-200 grid place-items-center">
            {isProfilePictureValid() ? (
              <img
                src={user?.profile_img}
                className="rounded-full w-10 h-10 cursor-pointer"
                onClick={openProfilePicMOdal}
              />
            ) : (
              <FontAwesomeIcon icon={faUser} className="text-[white]" />
            )}
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
            onClick={(e: any) => openLogoutMenu(e)}
          />
          <Menu
            id="basic-menu"
            anchorEl={logoutMenuTarget}
            open={open}
            onClose={closeLogoutMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <div className="p-2">
              <div className="cursor-pointer" onClick={handleLogOut}>
                Logout
              </div>
            </div>
          </Menu>
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
      {shouldOpenProfilePicModal ? (
        <ProfilePicModal
          open={shouldOpenProfilePicModal}
          setOpen={setShouldOpenProfilePicModal}
          image_url={user.profile_img}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ChatListHeader;
