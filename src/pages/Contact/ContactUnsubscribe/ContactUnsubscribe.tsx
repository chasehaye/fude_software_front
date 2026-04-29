import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { contactUnsubscribe } from '../../../utils/contact-api';
import { getListName } from '../../../utils/list-api';

function ContactUnsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const list = searchParams.get('list');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [listName, setListName] = useState('');
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');

  async function handleSubmit() {
    try {
      if (!token || !list) {
        setError('Something went wrong try again or contact support');
        return;
      }
      await contactUnsubscribe(
        {
          token: token,
        },
        list
      );
      setConfirmed(true);
      setError('');
    } catch {
      setError('Network error. Please try again.');
    }
  }

  useEffect(() => {
    if (!list) return;
    async function fetchName() {
      try {
        setLoading(true);
        setListError('');

        const data = await getListName(list as string);

        setListName(data.name || '');
      } catch (err) {
        setListError('Failed to load list name');
      } finally {
        setLoading(false);
      }
    }
    fetchName();
  }, [list]);

  if (confirmed) {
    return (
      <div className="flex flex-col justify-center items-center w-full my-auto">
        <h1 className="uppercase font-bold text-2xl mb-2 text-center">
          Subscription Canceled
        </h1>
        <p className="text-center">
          You have successfully unsubscribed from {listName}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="border-b border-edge text-center h-14 flex justify-center w-full flex-shrink-0">
        <div className="pt-4 whitespace-nowrap select-none">
          Unsubscribe from:{' '}
          {loading ? (
            <span className="text-gray-400">Loading...</span>
          ) : listError ? (
            <span className="text-red-500">Unknown list</span>
          ) : (
            listName
          )}
        </div>
      </div>
      <div className="m-auto">
        <button
          onClick={handleSubmit}
          className="border border-edge hover:border-hover px-4 py-6 w-40 cursor-pointer hover:text-hoverc transition-colors hover:bg-hoverc/10"
        >
          Unsubscribe
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default ContactUnsubscribe;
