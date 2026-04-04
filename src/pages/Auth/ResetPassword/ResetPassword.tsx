import { resetPassword } from '../../../utils/user-api.ts';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FormHeader from '../../../componenets/FormHeader/FormHeader';
import FormField from '../../../componenets/FormField/FormField';
import FormSubmitButton from '../../../componenets/FormSubmitButton/FormSubmitButton';
import FormError from '../../../componenets/FormError/FormError';

function ResetPassword() {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    error: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isNotMatch = formData.newPassword !== formData.confirmPassword;
  const isInvalid = !formData.newPassword || !formData.confirmPassword;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      error: '',
    });
  }

  function handleInsufficientPassword(password: string) {
    const missing = [];

    if (password.length < 8) missing.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) missing.push('an uppercase letter');
    if (!/[a-z]/.test(password)) missing.push('a lowercase letter');
    if (!/\d/.test(password)) missing.push('a number');
    if (!/[@$!%*?&]/.test(password))
      missing.push('a special character (@$!%*?&)');

    if (missing.length === 0) return null;
    return `PASSWORD_IS_MISSING: ${missing.join(', ').replace(/, ([^,]*)$/, ', and $1')}.`;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isNotMatch) {
      setFormData({ ...formData, error: 'Passwords do not match.' });
      return;
    }
    const passwordError = handleInsufficientPassword(formData.newPassword);
    if (passwordError) {
      setFormData({
        ...formData,
        error: passwordError,
      });
      return;
    }
    try {
      const payload = {
        new_password: formData.newPassword,
      };
      await resetPassword(payload, token);
      setIsSubmitted(true);
    } catch {
      setFormData({
        ...formData,
        error: 'Failed to reset password. Link may be expired.',
      });
    }
  }

  return (
    <>
      <div className="border-b border-edge text-center h-14 flex justify-center sm:justify-between w-full flex-shrink-0">
        <Link
          to="/"
          className="hidden sm:flex px-10 sm:px-20 sm:border-r sm:border-edge cursor-pointer select-none hover:bg-hoverc/10 transition-all hover:text-hoverc items-center justify-center"
        >
          Home
        </Link>
        <Link
          to="/forgot-password"
          className="px-10 sm:border-l sm:border-edge whitespace-nowrap select-none cursor-pointer hover:bg-hoverc/10 transition-all hover:text-hoverc flex items-center justify-center"
        >
          Request New Link
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        {!isSubmitted ? (
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-80 text-left"
          >
            <FormHeader text={'Change Password'} />
            <p className="text-sm mb-6 text-center">
              Enter your new password below
            </p>

            <FormField
              fieldName="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              isRequired={true}
            />

            <label className="text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`bg-transparent border p-2 outline-none focus:border-hoverc ${isNotMatch && formData.confirmPassword ? 'border-red-500' : 'border-edge'}`}
            />
            <div className="h-5">
              {isNotMatch && formData.confirmPassword && (
                <span className="text-red-500 text-[12px] mt-1 block">
                  Passwords do not match
                </span>
              )}
            </div>

            <FormSubmitButton
              buttonText={'Change Password'}
              isInvalid={isInvalid || isNotMatch}
            />
            <FormError errorText={formData.error} />
          </form>
        ) : (
          <div className="max-w-80">
            <p className="text-sm mb-6 text-center">
              Your password reset has been completed. Proceed to log back into
              your account below.
            </p>
            <Link
              to="/login"
              className="text-sm underline hover:text-hoverc cursor-pointer"
            >
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default ResetPassword;
