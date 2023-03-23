import { useAppSelector } from "../../shared/redux/hooks";
import ChatListHeader from "./ChatListHeader";
import ChatWindowHeader from "./ChatWindowHeader";

interface IHeaderProps {
  screenSize: number;
  setScreenSize: Function;
}
const Header = (props: IHeaderProps) => {
  const isChatVisible = useAppSelector((state) => state.chat.isChatVisible);
  return (
    <header className="">
      <div className="flex-grow sm:grid sm:grid-cols-10  ">
        {props.screenSize > 640 ? (
          <>
            <div className="col-span-3 overflow-hidden py-3 border-r bg-gray-100">
              <ChatListHeader />
            </div>
            <div className="col-span-7 overflow-hidden ">
              <ChatWindowHeader />
            </div>
          </>
        ) : (
          <>
            {isChatVisible ? (
              <div className="overflow-hidden">
                <ChatWindowHeader />
              </div>
            ) : (
              <div className="overflow-hidden py-3 border-r bg-gray-100">
                <ChatListHeader />
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
