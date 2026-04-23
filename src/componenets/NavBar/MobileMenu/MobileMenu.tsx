import { Link, useNavigate } from 'react-router-dom';

import { useUser } from '../../../context/UserContext';

function MobileMenu() {
  const navigate = useNavigate();
  const { logoutUser } = useUser();
  return (
    <div className="w-full sm:hidden">
      <div
        onClick={() => navigate('/maintenance')}
        className="flex-1 border-b border-edge py-4 text-center text-md truncate"
      >
        API_Management
      </div>
      <div
        onClick={() => navigate('/maintenance')}
        className="flex-1 border-b border-edge py-4 text-center text-md truncate"
      >
        Manage_Account
      </div>
      <div
        onClick={() => navigate('/mailing-list/index')}
        className="flex-1 border-b border-edge py-4 text-center text-md truncate"
      >
        Mailing_List
      </div>
      <div
        onClick={() => navigate('/maintenance')}
        className="flex-1 border-b border-edge py-4 text-center text-md truncate"
      >
        Inbound_Inquires
      </div>
      <div
        onClick={() => navigate('/maintenance')}
        className="flex-1 border-b border-edge py-4 text-center text-md truncate"
      >
        Bug_Reports
      </div>
      <div
        onClick={() => navigate('/maintenance')}
        className="flex-1 border-b border-edge py-4 text-center text-md truncate"
      >
        Service_Status
      </div>
      <Link
        to="/profile"
        className="flex-1 border-b border-edge py-4 text-center text-md truncate block"
      >
        Profile
      </Link>
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
