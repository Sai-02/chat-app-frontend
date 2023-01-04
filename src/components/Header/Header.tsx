import { faUserCircle, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Header = () => {
  return (
    <header className="text-white p-4 px-12 bg-[#1976D2] flex ">
      <div className="">
        <h2 className="font-bold text-xl">Chat app</h2>
      </div>
      <div className="flex-grow flex flex-row-reverse gap-8">
        <div className="text-xl cursor-pointer">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <div className="text-xl cursor-pointer">
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div className="text-lg hover:text-[#F9F6EE] cursor-pointer">
          Create Group
        </div>
      </div>
    </header>
  );
};

export default Header;
