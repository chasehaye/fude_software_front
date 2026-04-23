import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FormError from '../../../componenets/Form/FormError/FormError.tsx';
import FormField from '../../../componenets/Form/FormField/FormField.tsx';
import FormHeader from '../../../componenets/Form/FormHeader/FormHeader.tsx';
import FormSubmitButton from '../../../componenets/Form/FormSubmitButton/FormSubmitButton.tsx';
import { useUser } from '../../../context/UserContext.tsx';
import { signUp } from '../../../utils/user-api.ts';

function SignUp() {
  const navigate = useNavigate();
  const { setUser, setAdmin } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  });
  const isInvalid = !formData.confirm || !formData.email || !formData.password;
  const isNotMatch = formData.password !== formData.confirm;

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
    const report = missing
      .map((item) => `[!] MISSING: ${item.toUpperCase()}`)
      .join('\n');

    return `PASSWORD_INSUFFICIENT:\n${report}`;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isNotMatch) {
      setFormData({
        ...formData,
        error: 'PASSWORDS_DO_NOT_MATCH - Try Again',
      });
      return;
    }

    const passwordError = handleInsufficientPassword(formData.password);
    if (passwordError) {
      setFormData({
        ...formData,
        error: passwordError,
      });
      return;
    }

    try {
      const { name, email, password } = formData;
      const payload = { name, email, password };
      const data = await signUp(payload);
      if (data) {
        setUser(data);
        setAdmin(data.is_admin === true);
        navigate('/dashboard');
      }
    } catch {
      setFormData({
        ...formData,
        error: 'SIGNUP_FAILURE: User already exists or invalid email',
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="border-b border-edge text-center h-14 flex justify-center sm:justify-between w-full flex-shrink-0">
        <Link
          to="/"
          className="px-10 sm:px-20 sm:border-r sm:border-edge pt-4 cursor-pointer select-none hover:bg-hoverc/10 transition-all hover:text-hoverc"
        >
          Return
        </Link>
        <div className="hidden sm:block px-20 sm:border-l sm:border-edge pt-4 whitespace-nowrap select-none">
          Register
        </div>
      </div>
      <p className="text-sm mb-6 text-center">
        {' '}
        remove me later: should direct to a page for the user to get their api
        token currently redirects home
      </p>
      <div className="flex flex-col items-center justify-center flex-grow px-4 mt-10">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full max-w-80"
        >
          <FormHeader text={'Register an account'} />

          <FormField
            fieldName="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isRequired={true}
          />
          <FormField
            fieldName="Username(Optional)"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormField
            fieldName="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isRequired={true}
          />
          <FormField
            fieldName="Confirm Password"
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            isRequired={true}
          />

          <FormSubmitButton
            buttonText={'Create Account'}
            isInvalid={isInvalid}
          />
        </form>
        {formData.error && <FormError errorText={formData.error} />}
      </div>
    </div>
  );
}

export default SignUp;
