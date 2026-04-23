import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FormError from '../../../componenets/Form/FormError/FormError.tsx';
import FormField from '../../../componenets/Form/FormField/FormField.tsx';
import FormHeader from '../../../componenets/Form/FormHeader/FormHeader.tsx';
import FormSubmitButton from '../../../componenets/Form/FormSubmitButton/FormSubmitButton.tsx';
import { useUser } from '../../../context/UserContext.tsx';
import { login } from '../../../utils/user-api.ts';

function Login() {
  const navigate = useNavigate();
  const { setUser, setAdmin } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error: '',
  });
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
      const data = await login(payload);
      if (data) {
        setUser(data);
        setAdmin(data.is_admin === true);
        navigate('/');
      }
    } catch {
      setFormData({ ...formData, error: 'ACCESS_DENIED: Invalid credentials' });
    }
  }

  return (
    <>
      <div className="border-b border-edge text-center h-14 flex justify-center sm:justify-between w-full flex-shrink-0">
        <Link
          to="/"
          className="px-10 sm:px-20 sm:border-r sm:border-edge pt-4 select-none hover:bg-hoverc/10 transition-all hover:text-hoverc items-center inline-block"
        >
          Return
        </Link>
        <div className="hidden sm:block px-20 sm:border-l sm:border-edge pt-4 whitespace-nowrap select-none">
          Sign In
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <FormHeader text={'Sign back into your account'} />
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-80"
        >
          <FormField
            fieldName="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isRequired={true}
          />
          <FormField
            fieldName="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isRequired={true}
          />

          <Link
            to="/forgot-password"
            className="text-xs underline cursor-pointer mt-1"
          >
            Forgot Password
          </Link>

          <FormSubmitButton buttonText={'Login'} isInvalid={isInvalid} />
        </form>
        <FormError errorText={formData.error} />
      </div>
    </>
  );
}

export default Login;
