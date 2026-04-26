import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { contactSubscribeConfirm } from '../../../utils/contact-api';

function ContactSubscribeConfirm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const listId = searchParams.get('list_id');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function confirm() {
      try {
        if (!token || !listId) {
          setError(true);
          return;
        }
        const data = await contactSubscribeConfirm({
          token: token,
          list_id: listId,
        });
        console.log(data);
        setSuccess(true);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    confirm();
  }, [token, listId]);

  if (loading) {
    return <div className="flex justify-center my-auto w-full">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center my-auto items-center w-full">
        <h1 className="text-red-600 font-bold">
          Subscription could not be confirmed
        </h1>
        <p>Link may be invalid or expired</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col justify-center items-center w-full my-auto">
        <h1 className="uppercase font-bold text-2xl mb-2">
          Subscription_confirmed
        </h1>
        <p>Thank you for confirming your subscription.</p>
      </div>
    );
  }
}

export default ContactSubscribeConfirm;
