import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { chatActions } from "../../redux/slices/chatSlice";
interface ICreateChatModalProp {
  open: boolean;
  setOpen: Function;
}
const CreateChatModal = (props: ICreateChatModalProp) => {
  const dispatch = useAppDispatch();
  const searchedUsers = useAppSelector((state) => state.chat.searchedUsers);
  const user = useAppSelector((state) => state.auth.user);
  const [groupName, setGroupName] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(chatActions.updateSearchedUsers([]));
  }, []);
  const searchUsers = async () => {
    if (searchUsername.trim() === "") return;
    const res = await dispatch(
      chatActions.searchUsers({ username: searchUsername })
    );
    if (res.payload) {
    }
  };
  const closeModal = () => {
    props.setOpen(false);
  };
  const addUser = (username: any) => {
    const arr = [...selectedUsers, username];
    setSelectedUsers(arr);
  };
  const removeUser = (username: any) => {
    const arr = selectedUsers.filter((val: any) => val !== username);
    setSelectedUsers([...arr]);
  };
  const createChat = async () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select the members");
      return;
    }
    if (groupName.trim() === "") {
      toast.error("Please enter the name of group");
      return;
    }
    setLoading(true);
    await dispatch(
      chatActions.createChat({
        name: groupName,
        members: [...selectedUsers, user.username],
        admin: user.username,
      })
    );
    await dispatch(chatActions.getChatList());
    toast.success("Group created !!");
    setLoading(false);
    closeModal();
  };
  return (
    <div className="">
      <Dialog
        open={props.open}
        fullScreen
        sx={{
          background: "transparent",
        }}
      >
        <div className="h-screen w-screen p-8 bg-[#F7F8FF] flex flex-col gap-4">
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon={faClose}
              className="cursor-pointer"
              onClick={closeModal}
            />
          </div>
          <div className="grid gap-3 mt-4">
            <h1 className="text-xl">Name of the group</h1>
            <input
              type="text"
              className="outline-none rounded-xl border-2 border-blue-primary p-2"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="flex grow justify-center">
            <div className="shadow rounded bg-white p-3 w-[50vw]">
              <div className="rounded flex justify-center border">
                <input
                  type="text"
                  className="outline-none p-2 px-3 rounded-l grow"
                  placeholder="Username.."
                  value={searchUsername}
                  onChange={(e) => setSearchUsername(e.target.value)}
                />
                <button
                  className=" p-2 px-3 bg-blue-600 rounded-r text-white"
                  onClick={searchUsers}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div className="h-[8rem] overflow-auto">
                {searchedUsers.map((val) => {
                  return (
                    <>
                      {selectedUsers.includes(val.username) ||
                      user.username === val.username ? (
                        <></>
                      ) : (
                        <div
                          className="flex flex-col text-xs border px-3 cursor-pointer "
                          key={val.username}
                          onClick={() => {
                            addUser(val.username || "");
                          }}
                        >
                          <h3 className="">{val.name}</h3>
                          <h4 className="">{val.username}</h4>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
              <div className="mt-4 p-2">
                <h2 className="">Added Users</h2>
                <div className="flex gap-2">
                  {selectedUsers.map((username: any) => {
                    return (
                      <div
                        className="flex gap-2 rounded p-1 bg-gray-200"
                        key={username}
                      >
                        <span className="">{username}</span>
                        <span className="">
                          <FontAwesomeIcon
                            icon={faClose}
                            className="cursor-pointer"
                            onClick={() => {
                              removeUser(username);
                            }}
                          />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <button
              className={`bg-blue-500 text-wh ite rounded px-3 py-2 text-white ${
                loading ? "cursor-not-allowed opacity-25" : ""
              }`}
              onClick={createChat}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateChatModal;
