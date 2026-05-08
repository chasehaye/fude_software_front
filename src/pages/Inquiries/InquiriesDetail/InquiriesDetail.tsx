import { format } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import CancelButton from '../../../componenets/CancelButton/CancelButton';
import DeleteButton from '../../../componenets/DeleteButton/DeleteButton';
import NavBar from '../../../componenets/NavBar/NavBar/NavBar.tsx';
import { deleteList, getList } from '../../../utils/list-api.ts';

type Message = {
  id: number;
  header: string;
  body: string;
};

type InquiryItem = {
  id: number;
  name: string;
  public_facing_name: string;
  created_at: string;
  public_id?: string;
  messages?: Message[];
};

const formatDateTime = (value?: string) => {
  if (!value) return '—';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '—';
  return format(date, 'p - P');
};

function InquiryDetail() {
  const { id } = useParams();
  const [status, setStatus] = useState('idle');
  const [list, setList] = useState<InquiryItem | null>(null);
  const [open, setOpen] = useState(false);
  const cancelledRef = useRef(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(
      `${apiUrl}/api/public/send/message/${list?.public_id}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const fetchList = useCallback(async () => {
    try {
      setStatus('loading');
      const data = await getList(id as string);
      if (!cancelledRef.current) {
        setList(data);
        setStatus('idle');
      }
    } catch {
      if (!cancelledRef.current) {
        setStatus('error');
      }
    }
  }, [id]);

  useEffect(() => {
    cancelledRef.current = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchList();
    return () => {
      cancelledRef.current = true;
    };
  }, [fetchList]);

  async function handleDelete() {
    try {
      setStatus('deleting');
      await deleteList(id as string);
      setStatus('success');
    } catch {
      alert('Failed to delete. Please try again.');
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <>
        <NavBar />
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <h2 className="text-2xl font-bold mb-2">Deleted</h2>
          <p className="mb-6">
            Inquiry <span className="text-white">_{list?.name}_</span> has been
            removed.
          </p>
          <Link
            to="/inquiries/index"
            className="text-white hover:underline font-medium"
          >
            Return to Inquiries
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
          <h2 className="text-xl font-semibold">Deleting...</h2>
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
            This will permanently delete the inquires and all associated
            messages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <DeleteButton
              onDelete={handleDelete}
              text="Yes, Delete Permanently"
            />
            <CancelButton
              onCancel={() => setStatus('idle')}
              text="No, Keep It"
            />
          </div>
        </div>
      </>
    );
  }

  if (status === 'loading') {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (status === 'error') {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center h-64">
          <p>Failed to load Inquiry.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="p-6">
        <div className="flex flex-row justify-between items-start border-b border-edge pb-6 pt-10">
          <div>
            <h1 className="text-2xl font-bold text-white">{list?.name}</h1>
            <p>{list?.public_facing_name}</p>
            <p className="text-sm opacity-60">
              Created: {formatDateTime(list?.created_at)}
            </p>
            <p className="break-words">
              <span className="text-white">API_ENDPOINT: </span>{' '}
              <br className="sm:hidden" />
              <span
                onClick={handleCopy}
                className="hover:text-white cursor-pointer"
              >
                {apiUrl}/api/public/send/message/{list?.public_id}
              </span>
            </p>
            {copied && (
              <span className="text-hoverc ml-2">Copied to clipboard!</span>
            )}
          </div>
          <svg
            onClick={() => setOpen(!open)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 hover:text-white cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
            />
          </svg>
          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
              <div className="w-64 bg-black border border-edge pt-4 pb-10 p-2">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full text-center mt-4 hover:text-white"
                >
                  Return Back
                </button>
                {status === 'idle' && (
                  <div className="w-full flex justify-center mt-10">
                    <DeleteButton
                      onDelete={() => setStatus('confirming')}
                      text="Delete"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full gap-4 mt-8">
          {list?.messages?.length === 0 && (
            <p className="opacity-60">No messages yet.</p>
          )}
          {list?.messages?.map((msg) => (
            <div key={msg.id} className="border border-edge p-3">
              <p className="font-semibold">{msg.header}</p>
              <p className="text-sm opacity-80">{msg.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InquiryDetail;
