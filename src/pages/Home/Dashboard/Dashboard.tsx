import NavBar from '../../../componenets/NavBar/NavBar.tsx';
import { useUser } from '../../../context/UserContext.tsx';

function DashBoard() {
  const { user } = useUser();

  return (
    <>
      <NavBar />

      <div className="p-10 space-y-4">
        <p className="text-hoverc tracking-tighter">
          SESSION_ACTIVE_NAME: {user?.user_name}
        </p>
        <p className="text-hoverc tracking-tighter">
          SESSION_ACTIVE_EMAIL: {user?.user_email}
        </p>
      </div>
    </>
  );
}

export default DashBoard;
