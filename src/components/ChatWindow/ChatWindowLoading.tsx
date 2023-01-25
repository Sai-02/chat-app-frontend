import { Skeleton } from "@mui/material";
import React from "react";

const ChatWindowLoading = () => {
  return (
    <>
      {[...Array(10)].map((val, index) => {
        return (
          <div className={`text-black grid `}>
            <Skeleton
              variant="text"
              className={`rounded-full  bg-[#6CB4EE] py-2 px-4 w-[8rem] h-[5rem] max-w-[60%] shadow ${
                index % 2 == 0 ? "justify-self-start" : "justify-self-end"
              }`}
            />
          </div>
        );
      })}
    </>
  );
};

export default ChatWindowLoading;
