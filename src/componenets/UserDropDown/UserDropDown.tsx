import { useUser } from '../../context/UserContext.tsx';

interface UserDropDownProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function UserDropDown({ onMouseEnter, onMouseLeave }: UserDropDownProps) {
  const { user, logoutUser } = useUser();
  return (
    <div
      className="hidden bg-black z-10 sm:flex fixed right-0 border-l border-edge w-[10%] items-center justify-center flex-col select-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="border-b border-edge w-full text-center text-sm pt-2 pb-1 truncate cursor-pointer">
        {user?.user_name}
      </div>
      <div
        onClick={logoutUser}
        className="border-b border-edge w-full text-center text-sm py-1 hover:bg-red-900/20 hover:text-red-500 transition-all cursor-pointer"
      >
        [logout]
      </div>
    </div>
  );
}

export default UserDropDown;
