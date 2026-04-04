import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext.tsx';

import DashBoard from './pages/Home/Dashboard/Dashboard.tsx';
import Landing from './pages/Home/Landing/Landing.tsx';

import Auth from './pages/Auth/AuthHome/AuthHome.tsx';
import Login from './pages/Auth/Login/Login.tsx';
import SignUp from './pages/Auth/SignUp/SignUp.tsx';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword.tsx';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword.tsx';
import CycleToken from './pages/Auth/CycleToken/CycleToken.tsx';

import MailingListCreate from './pages/MailingList/MailingListCreate/MailingListCreate.tsx';
import MailingListDetail from './pages/MailingList/MailingListDetail/MailingListDetail.tsx';
import MailingListIndex from './pages/MailingList/MailingListIndex/MailingListIndex.tsx';

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
          </>
        )}
      </Routes>
    </main>
  );
}

export default App;
