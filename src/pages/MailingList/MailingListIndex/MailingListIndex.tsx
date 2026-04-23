import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../../../componenets/NavBar/NavBar/NavBar.tsx';
import { useUser } from '../../../context/UserContext.tsx';
import { indexList } from '../../../utils/list-api.ts';

type MailingListItem = {
  id: number;
  name: string;
  list_type: string;
  updated_at: string;
  subscriber_count: number;
};

type MailingListResponse = {
  lists: MailingListItem[];
  total_count: number;
  total_pages: number;
  current_page: number;
};

function MailingListIndex() {
  const { user } = useUser();
  const countPerPage = 10;
  const [page, setPage] = useState(1);
  const [lists, setLists] = useState<MailingListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getLists() {
      setLoading(true);
      try {
        const payload = {
          page: page,
          count_per_page: countPerPage,
        };
        const data = await indexList(payload);
        if (data) {
          setLists(data);
        }
      } catch (err) {
        console.error('Fetch failed' + err);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      getLists();
    }
  }, [page, user, countPerPage]);

  return (
    <div className="flex flex-col min-h-screen font-roboto uppercase">
      <NavBar />
      <div className="ml-14 mt-2">
        <button
          onClick={() => navigate('/mailing-list/create')}
          className="hover:text-hoverc cursor-pointer"
        >
          [Create Mailing List]
        </button>
      </div>

      <div className="p-10 w-full text-center">
        <div className="w-full text-center">
          {loading ? (
            <p>LOADING_DATA...</p>
          ) : (
            lists?.lists?.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/mailing-list/${item.id}`)}
                className="border-b border-edge py-4 cursor-pointer hover:bg-hoverc/10"
              >
                <span className="font-bold hover:text-hoverc">{item.name}</span>
                <span className="ml-4 opacity-70">
                  Subscribers: {item.subscriber_count}
                </span>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="flex justify-center mt-2">
          <button
            className="disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:text-hoverc mr-2 px-1"
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            [PREV]
          </button>

          <span className="tracking-widest">
            PAGE {page} / {lists?.total_pages || 1}
          </span>

          <button
            className="disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:text-hoverc ml-2 px-1"
            // Disable if we are on the last page
            disabled={page >= (lists?.total_pages || 1) || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            [NEXT]
          </button>
        </div>
      </div>
    </div>
  );
}
export default MailingListIndex;
