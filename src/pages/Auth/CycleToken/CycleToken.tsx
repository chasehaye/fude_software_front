import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { cycleToken } from '../../../utils/user-api.ts';

function CycleToken() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error: '',
  });
  const [returnedToken, setReturnedToken] = useState(null);

  const isInvalid = !formData.email || !formData.password;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      error: '',
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const payload = { email, password };
      const response = await cycleToken(payload);
      setReturnedToken(response.api_token);
    } catch {
      setFormData({ ...formData, error: 'Incorrect email or password' });
    }
  }

  return (
    <>
      <div className="border-b border-edge text-center h-14 flex justify-between w-full flex-shrink-0">
        <Link
          to="/"
          className="pl-10 md:px-20 md:border-r md:border-edge pt-4 cursor-pointer select-none hover:bg-hoverc/10 transition-all hover:text-hoverc"
        >
          Home
        </Link>
        <div className="pr-10 md:px-20 md:border-l md:border-edge pt-4 whitespace-nowrap select-none">
          Token Management
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow px-4">
        {!returnedToken ? (
          <div className="w-full max-w-80">
            <h2 className="text-xl mb-6 font-semibold text-center">
              Cycle API Token
            </h2>
            <p className="text-sm mb-6 text-center">
              Enter your credentials to get a new api token.{' '}
              <span className="text-red-500">WARNING</span>, this will
              invalidate your old token
            </p>
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className="flex flex-col w-full"
            >
              <label className="text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent border border-edge p-2 outline-none focus:border-hoverc mb-4"
              />

              <label className="text-sm mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-transparent border border-edge p-2 outline-none focus:border-hoverc mb-6"
              />

              <button
                type="submit"
                disabled={isInvalid}
                className="border border-edge py-2 hover:bg-hoverc/10 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all"
              >
                Generate New Token
              </button>
            </form>
            {formData.error && (
              <p className="text-red-500 mt-4 text-center">{formData.error}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-md text-center">
            <div className="mb-4 text-4xl">✓</div>
            <h2 className="text-xl font-semibold mb-2">New Token Generated</h2>
            <p className="text-sm opacity-70 mb-6">
              Make sure to copy this now. You won't be able to see it again.
            </p>

            <div
              className="w-full bg-hoverc/5 border border-edge p-4 rounded mb-8 break-all font-mono text-sm select-all cursor-pointer"
              title="Click to select all"
            >
              {returnedToken}
            </div>

            <button
              onClick={() => navigate('/')}
              className="text-sm underline hover:text-hoverc transition-all cursor-pointer"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CycleToken;
