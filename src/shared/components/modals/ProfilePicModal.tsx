import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@mui/material";
import React from "react";
interface IProfilePicModalProps {
  open: boolean;
  setOpen: Function;
  image_url: string;
}
const ProfilePicModal = (props: IProfilePicModalProps) => {
  const closeModal = () => {
    props.setOpen(false);
  };
  return (
    <Dialog open={props.open}>
      <div className="p-4 min-w-[40vw] ">
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
        <div className=" grid place-items-center w-full h-full mt-4">
          <img
            src={props.image_url}
            alt=""
            className="rounded-full h-40 w-40"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ProfilePicModal;
