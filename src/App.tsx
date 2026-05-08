import { Navigate, Route, Routes } from 'react-router-dom';

import { useUser } from './context/UserContext.tsx';
import ApiPage from './pages/ApiPage/ApiPage.tsx';
import Auth from './pages/Auth/AuthHome/AuthHome.tsx';
import CycleToken from './pages/Auth/CycleToken/CycleToken.tsx';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword.tsx';
import Login from './pages/Auth/Login/Login.tsx';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword.tsx';
import SignUp from './pages/Auth/SignUp/SignUp.tsx';
import BugReportCreate from './pages/BugReports/BugReportsCreate/BugReportsCreate.tsx';
import BugReportDetail from './pages/BugReports/BugReportsDetail/BugReportsDetail.tsx';
import BugReportIndex from './pages/BugReports/BugReportsIndex/BugReportsIndex.tsx';
import ContactSubscribe from './pages/Contact/ContactSubscribe/ContactSubscribe.tsx';
import ContactSubscribeConfirm from './pages/Contact/ContactSubscribeConfrim/ContactSubscribeConfirm.tsx';
import ContactUnsubscribe from './pages/Contact/ContactUnsubscribe/ContactUnsubscribe.tsx';
import DashBoard from './pages/Home/Dashboard/Dashboard.tsx';
import Landing from './pages/Home/Landing/Landing.tsx';
import InquiriesCreate from './pages/Inquiries/InquiriesCreate/InquiriesCreate.tsx';
import InquiryDetail from './pages/Inquiries/InquiriesDetail/InquiriesDetail.tsx';
import InquiriesIndex from './pages/Inquiries/InquiriesIndex/InquiriesIndex.tsx';
import MailingListCreate from './pages/MailingList/MailingListCreate/MailingListCreate.tsx';
import MailingListDetail from './pages/MailingList/MailingListDetail/MailingListDetail.tsx';
import MailingListIndex from './pages/MailingList/MailingListIndex/MailingListIndex.tsx';
import MaintenancePage from './pages/MaintenancePage/MaintenancePage.tsx';
import EmailChangeConfirm from './pages/ProfilePage/EamilChangeConfirm.tsx';
import Profile from './pages/ProfilePage/ProfilePage.tsx';
import ServiceStatus from './pages/ServiceStatus/ServiceStatus.tsx';

function App() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-hoverc">
        Loading...
      </div>
    );
  }
  return (
    <main className="flex flex-col min-h-screen w-full">
      <Routes>
        <Route path="/subscribe/:listId" element={<ContactSubscribe />} />
        <Route
          path="/confirm-subscription"
          element={<ContactSubscribeConfirm />}
        />
        <Route path="/unsubscribe" element={<ContactUnsubscribe />} />

        {!user ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/cycle-token" element={<CycleToken />} />

            <Route path="/mailing-list/index" element={<MailingListIndex />} />
            <Route
              path="/mailing-list/create"
              element={<MailingListCreate />}
            />
            <Route path="/mailing-list/:id" element={<MailingListDetail />} />

            <Route
              path="/bug-report/project/create"
              element={<BugReportCreate />}
            />
            <Route path="/bug-report/index" element={<BugReportIndex />} />
            <Route path="/bug-report/:id" element={<BugReportDetail />} />

            <Route
              path="/inquiry/project/create"
              element={<InquiriesCreate />}
            />
            <Route path="/inquiries/index" element={<InquiriesIndex />} />
            <Route path="/inquiry/:id" element={<InquiryDetail />} />
            <Route path="/api/info" element={<ApiPage />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/service-status" element={<ServiceStatus />} />

            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route
              path="/change-email/confirm"
              element={<EmailChangeConfirm />}
            />
          </>
        )}
      </Routes>
    </main>
  );
}

export default App;
