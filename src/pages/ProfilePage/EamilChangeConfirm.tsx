import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { updateEmailConfirm } from '../../utils/user-api';

function EmailChangeConfirm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!token) {
      setError('Invalid or missing token');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await updateEmailConfirm({ token: token });
      navigate('/profile');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="border-b border-edge text-center h-14 flex justify-center w-full flex-shrink-0">
        <div className="pt-4 whitespace-nowrap select-none">
          Account Email Change Confirmation
        </div>
      </div>

      <div className="m-auto flex flex-col items-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="border border-edge hover:border-hover px-4 py-6 w-40 cursor-pointer hover:text-hoverc transition-colors hover:bg-hoverc/10 disabled:opacity-50"
        >
          {loading ? 'Confirming...' : 'Confirm'}
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default EmailChangeConfirm;
