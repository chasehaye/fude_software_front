import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.tsx';

function MobileMenu() {
  const navigate = useNavigate();
  const { logoutUser } = useUser();
  return (
    <div className="w-full sm:hidden">
      <div className="flex-1 border-b border-edge py-4 text-center text-md truncate">
        API_Management
      </div>
      <div className="flex-1 border-b border-edge py-4 text-center text-md truncate">
        Manage_Account
      </div>
      <div
        onClick={() => navigate('/mailing-list/index')}
        className="flex-1 border-b border-edge py-4 text-center text-md truncate"
      >
        Mailing_List
      </div>
      <div className="flex-1 border-b border-edge py-4 text-center text-md truncate">
        Inbound_Inquires
      </div>
      <div className="flex-1 border-b border-edge py-4 text-center text-md truncate">
        Bug_Reports
      </div>
      <div className="flex-1 border-b border-edge py-4 text-center text-md truncate">
        Service_Status
      </div>
      <div
        onClick={logoutUser}
        className="flex-1 border-b border-edge py-4 text-center text-md truncate"
      >
        [logout]
      </div>
    </div>
  );
}

export default MobileMenu;
