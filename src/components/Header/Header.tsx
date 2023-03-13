import ChatListHeader from "./ChatListHeader";
import ChatWindowHeader from "./ChatWindowHeader";

const Header = () => {
  return (
    <header className="">
      <div className="flex-grow grid grid-cols-10  ">
        <div className="col-span-3 overflow-hidden py-3 border-r bg-gray-100">
          <ChatListHeader />
        </div>
        <div className="col-span-7 overflow-hidden ">
          <ChatWindowHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
