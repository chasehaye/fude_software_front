import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import CancelButton from '../../../componenets/CancelButton/CancelButton';
import DeleteButton from '../../../componenets/DeleteButton/DeleteButton';
import SendMail from '../../../componenets/Mail/SendMail.tsx';
import NavBar from '../../../componenets/NavBar/NavBar/NavBar.tsx';
import { deleteList, getList } from '../../../utils/list-api.ts';

type Message = {
  id: number;
  header: string;
  body: string;
};

type Subscribers = {
  email: string;
};

type MailingListItem = {
  id: number;
  name: string;
  public_facing_name: string;
  list_type: string;
  created_at: string;
  updated_at: string;
  subscriber_count: number;
  public_id?: string;
  messages?: Message[];
  subscribers?: Subscribers[];
};

function MailingListDetail() {
  const { id } = useParams();
  const [status, setStatus] = useState('idle'); // 'idle' | 'deleting' | 'success' | 'confirming'
  const [list, setList] = useState<MailingListItem | null>(null);
  const apiUrl = import.meta.env.VITE_FRONTEND_URL;

  useEffect(() => {
    async function fetchList() {
      try {
        setStatus('loading');
        const data = await getList(id as string);
        setList(data);
        setStatus('idle');
      } catch {
        setStatus('error');
      }
    }
    fetchList();
  }, [id]);

  async function handleDelete() {
    try {
      setStatus('deleting');
      await deleteList(id as string);
      setStatus('success');
    } catch {
      alert('Failed to delete the list. Please try again.');
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <h2 className="text-2xl font-bold mb-2">Deleted</h2>
          <p className="mb-6">
            Mailing list{' '}
            <span className="text-white text-bold">_{list?.name}_</span> has
            been removed.
          </p>
          <Link
            to="/mailing-list/index"
            className="text-white hover:underline font-medium"
          >
            Return to Mailing Lists
          </Link>
        </div>
      </>
    );
  }
  if (status === 'deleting') {
    return (
      <>
        <NavBar />
        <div className="flex flex-col items-center justify-center h-64 animate-pulse">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-semibold">Deleting List...</h2>
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
            This will permanently delete the list and all associated subscribers
            and messages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <DeleteButton
              onDelete={handleDelete}
              text="Yes, Delete Permanently"
            />
            <CancelButton
              onCancel={() => setStatus('idle')}
              text="No, Keep List"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-edge pb-6 pt-10">
          <div className="mb-10 md:mt-0">
            <h1 className="text-2xl font-bold text-white">Mailing_List</h1>
            <h1 className="text-2xl font-bold text-white">{list?.name}</h1>
            <p> Public_Name: {list?.public_facing_name}</p>
          </div>

          {status === 'idle' && (
            <DeleteButton
              onDelete={() => setStatus('confirming')}
              text="Delete"
            />
          )}
        </div>

        <div className="mt-8 mx-">
          <p>Internal_Name: {list?.name}</p>
          <p>Public_Name: {list?.public_facing_name}</p>
          <p>Subscriber_Count: {list?.subscribers?.length}</p>
          <p className="break-words">Created_At: {list?.created_at}</p>
          <p className="break-words">Public_ID: {list?.public_id}</p>
          <Link to={`/subscribe/${list?.public_id}`}>
            <p className="break-words">
              Subscribe_To_List_Link:{' '}
              <span className="hover:text-white">
                {apiUrl}/subscribe/{list?.public_id}
              </span>
            </p>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row-reverse mt-10 pt-10 border-t border-edge justify-center gap-x-10">
          <div className="flex flex-col md:flex-row justify-center items-start lg:w-[50%] pb-10">
            <SendMail />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-start lg:w-[50%]">
            <div className="flex flex-col w-full gap-4">
              {list?.messages?.map((msg) => (
                <div key={msg.id} className="border border-edge p-3">
                  <p className="font-semibold">{msg.header}</p>
                  <p className="text-sm opacity-80">{msg.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MailingListDetail;
