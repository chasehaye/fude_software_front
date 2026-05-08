import { Link } from 'react-router-dom';

import { useUser } from '../../../context/UserContext';

function MobileMenu() {
  const { logoutUser } = useUser();
  return (
    <div className="w-full sm:hidden">
      <Link
        to="/api/info"
        className="block w-full border-b border-edge py-4 text-center text-md truncate"
      >
        API_Management
      </Link>
      <Link
        to="/mailing-list/index"
        className="block w-full border-b border-edge py-4 text-center text-md truncate"
      >
        Mailing_List
      </Link>
      <Link
        to="/inquiries/index"
        className="block w-full border-b border-edge py-4 text-center text-md truncate"
      >
        Inbound_Inquires
      </Link>
      <Link
        to="/bug-report/index"
        className="block w-full border-b border-edge py-4 text-center text-md truncate"
      >
        Bug_Reports
      </Link>
      <Link
        to="/service-status"
        className="block w-full border-b border-edge py-4 text-center text-md truncate"
      >
        Service_Status
      </Link>
      <Link
        to="/profile"
        className="flex-1 border-b border-edge py-4 text-center text-md truncate block"
      >
        Profile
      </Link>
      <div
        onClick={logoutUser}
        className="block w-full border-b border-edge py-4 text-center text-md truncate"
      >
        [logout]
      </div>
    </div>
  );
}

export default MobileMenu;
