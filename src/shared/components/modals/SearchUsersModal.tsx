import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { chatActions } from "../../redux/slices/chatSlice";
import { WINDOW_SIZE } from "../../utils/constant";
interface ISearchUsersModalProp {
  open: boolean;
  setOpen: Function;
}
const SearchUsersModal = (props: ISearchUsersModalProp) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);
  const user = useAppSelector((state) => state.auth.user);
  const personalChatMap = useAppSelector((state) => state.chat.personalChatMap);
  const dispatch = useAppDispatch();
  const closeModal = () => {
    props.setOpen(false);
  };
  const handleSubmit = async (e: any) => {
    if (e.key !== "Enter") return;
    if (searchKeyword.trim() === "") return;
    try {
      const res = await dispatch(
        chatActions.searchUsers({ username: searchKeyword })
      );
      setUsers(res?.payload?.users);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };
  const handleClickMessage = async (username: any) => {
    const chatID = getChatIDIfUserInPersonalChat(username);
    if (chatID) {
      dispatch(chatActions.updateActiveChatID(chatID));
      closeModal();
    } else {
      const { payload }: any = await dispatch(
        chatActions.createChat({
          name: `${username}+${user.username}`,
          members: [username, user.username],
          admin: "",
          isGroup: false,
          image: "",
        })
      );
      const chat = payload?.chat;
      await dispatch(chatActions.getChatList());
      dispatch(chatActions.updateActiveChatID(chat._id));
      closeModal();
    }
  };
  const getChatIDIfUserInPersonalChat = (username: any) => {
    for (let i = 0; i < personalChatMap.length; i++) {
      if (personalChatMap[i].username === username)
        return personalChatMap[i].chatID;
    }
  };
  return (
    <div className="">
      <Dialog open={props.open} fullScreen={screenSize < WINDOW_SIZE.SM}>
        <div className="p-6 w-full sm:min-w-[35rem] max-w-[95vw] overflow-hidden">
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer"
              onClick={closeModal}
            />
          </div>
          <div className="flex flex-col gap-4 overflow-hidden">
            <h1 className="text-lg font-semibold">Search Users</h1>
            <div className="flex items-center shadow rounded py-2 px-4 gap-2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              <input
                type="text"
                className="grow outline-none border-none"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleSubmit}
              />
            </div>
            <div className="sm:h-[9rem] overflow-auto px-3">
              {users.map((val: any, index) => {
                return (
                  <>
                    {val.username === user.username ? (
                      <></>
                    ) : (
                      <div className="flex gap-4 p-2 items-center">
                        <div className="w-6 h-6  rounded-full bg-gray-100"></div>
                        <div className="grow text-center">
                          {val.name} ( {val.username} ){" "}
                        </div>
                        <button
                          className="rounded bg-blue-500 text-white p-1"
                          onClick={() => handleClickMessage(val.username)}
                        >
                          Message
                        </button>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SearchUsersModal;
