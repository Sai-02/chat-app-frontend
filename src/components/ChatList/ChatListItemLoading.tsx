import Skeleton from "@mui/material/Skeleton";
import React from "react";
const ChatListItemLoading = () => {
  return (
    <div className="flex gap-4 p-4 cursor-pointer border">
      <div className="">
        <div className="w-12 h-12 rounded-full ">
          <Skeleton
            variant="circular"
            sx={{
              width: "3rem",
              height: "3rem",
            }}
          />
        </div>
      </div>
      <div className="flex-grow">
        <h2 className="text-left">
          <Skeleton variant="text" className="w-[50%]" />
        </h2>
        <p className="text-left">
          <Skeleton variant="text" />
        </p>
      </div>
    </div>
  );
};

export default ChatListItemLoading;
