import { useState } from 'react';
import { Link } from 'react-router-dom';

import CancelButton from '../../componenets/CancelButton/CancelButton';
import DeleteButton from '../../componenets/DeleteButton/DeleteButton';
import FormError from '../../componenets/Form/FormError/FormError';
import FormField from '../../componenets/Form/FormField/FormField';
import FormHeader from '../../componenets/Form/FormHeader/FormHeader';
import FormSubmitButton from '../../componenets/Form/FormSubmitButton/FormSubmitButton';
import NavBar from '../../componenets/NavBar/NavBar/NavBar';
import { useUser } from '../../context/UserContext';
import { deleteUser, updateEmail, updateUsername } from '../../utils/user-api';

function Profile() {
  const { user, setUser } = useUser();
  const [showChangeForm, setShowChangeForm] = useState('');
  const [formData, setFormData] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'deleting' | 'confirming'

  async function handleDelete() {
    try {
      setStatus('deleting');
      await deleteUser({ password: formData });
      setUser(null);
      setShowChangeForm('');
      setFormData('');
      setStatus('success');
    } catch {
      setError('Failed to delete account');
      setStatus('idle');
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    type: string
  ) {
    e.preventDefault();

    try {
      if (type === 'email') {
        await updateEmail({ email: formData });
        setUser((prev) => (prev ? { ...prev, user_email: formData } : prev));

        setShowChangeForm('');
        setFormData('');
      }

      if (type === 'username') {
        await updateUsername({ name: formData });
        setUser((prev) => (prev ? { ...prev, user_name: formData } : prev));
        setShowChangeForm('');
        setFormData('');
      }

      if (type === 'delete') {
        setStatus('confirming');
      }
    } catch {
      setError('Something went wrong - Try again');
    }
  }

  if (status === 'deleting') {
    return (
      <>
        <NavBar />
        <div className="flex flex-col items-center justify-center h-64 animate-pulse">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-semibold">Deleting Account...</h2>
        </div>
      </>
    );
  }

  if (status === 'confirming') {
    return (
      <>
        <NavBar />
        <div className="m-6 p-6 border-2 border-red-500 mt-20">
          <h2 className="text-lg font-bold text-red-700">
            Are you absolutely sure?
          </h2>
          <p className="mb-4">
            This will permanently delete the account and all associated data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <DeleteButton
              onDelete={handleDelete}
              text="Yes, Delete Permanently"
            />
            <CancelButton
              onCancel={() => setStatus('idle')}
              text="No, Return"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="select-none">
      <NavBar />
      <p className="text-[1.5rem] text-center pt-2">
        User Profile {user?.user_name}
      </p>
      <div className="pl-4 flex flex-col gap-y-6 text-left">
        <p>
          Email: {user?.user_email}{' '}
          <button
            onClick={() => {
              setShowChangeForm('email');
              setFormData('');
              setError('');
            }}
            className="ml-2 cursor-pointer hover:text-edge"
          >
            [Edit]
          </button>
        </p>
        <p>
          Username: {user?.user_name}{' '}
          <button
            onClick={() => {
              setShowChangeForm('username');
              setFormData('');
              setError('');
            }}
            className="ml-2 cursor-pointer hover:text-edge"
          >
            [Edit]
          </button>
        </p>
        <p>
          <Link to="/cycle-token" className="cursor-pointer hover:text-edge">
            [cycle_api_token]
          </Link>
        </p>
        <p>
          <button
            onClick={() => {
              setShowChangeForm('delete');
              setFormData('');
              setError('');
            }}
            className="cursor-pointer hover:text-edge text-left"
          >
            [delete_account]
          </button>
        </p>
      </div>

      <div className="flex justify-center mt-4">
        {showChangeForm === 'email' && (
          <form
            onSubmit={(e) => handleSubmit(e, 'email')}
            className="flex flex-col w-80"
          >
            <FormHeader text={'Change Email'} />
            <FormField
              fieldName="New Email"
              type="email"
              name="email"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              isRequired={true}
            />

            <FormSubmitButton buttonText={'Update Email'} isInvalid={false} />
            <FormError errorText={error} />
          </form>
        )}

        {showChangeForm === 'username' && (
          <form
            onSubmit={(e) => handleSubmit(e, 'username')}
            className="flex flex-col w-80"
          >
            <FormHeader text={'Change Username'} />
            <FormField
              fieldName="New Username"
              type="text"
              name="username"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              isRequired={true}
            />

            <FormSubmitButton
              buttonText={'Update Username'}
              isInvalid={false}
            />
            <FormError errorText={error} />
          </form>
        )}

        {showChangeForm === 'delete' && (
          <form
            onSubmit={(e) => handleSubmit(e, 'delete')}
            className="flex flex-col w-80"
          >
            <FormHeader text={'Delete Account'} />
            <FormField
              fieldName="Enter Password"
              type="password"
              name="password"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              isRequired={true}
            />

            <FormSubmitButton buttonText={'Delete Account'} isInvalid={false} />
            <FormError errorText={error} />
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
