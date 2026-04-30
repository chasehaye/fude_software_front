import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { updateEmailConfirm } from '../../utils/user-api';

function EmailChangeConfirm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function confirmEmail() {
      if (!token) {
        if (isMounted) {
          setError('Invalid or missing token');
          setLoading(false);
        }
        return;
      }
      if (isMounted) {
        setError('');
        setLoading(true);
      }
      try {
        await updateEmailConfirm({ token });
        if (isMounted) {
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            navigate('/profile');
          }, 5000);
        }
      } catch {
        if (isMounted) {
          setError('Network error. Please try again.');
          setLoading(false);
        }
      }
    }
    confirmEmail();
    return () => {
      isMounted = false;
    };
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="border-b border-edge text-center h-14 flex justify-center w-full flex-shrink-0">
        <div className="pt-4 whitespace-nowrap select-none">
          Account Email Change - Confirmation
        </div>
      </div>

      <div className="m-auto flex flex-col items-center">
        {loading && <p>Confirming email...</p>}

        {success && (
          <>
            <p className="text-white text-[1.5rem]">Email confirmed!</p>
            <p className="text-edge">Redirecting...</p>
          </>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default EmailChangeConfirm;
