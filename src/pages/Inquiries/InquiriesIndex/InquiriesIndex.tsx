import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../../componenets/NavBar/NavBar/NavBar';
import { useUser } from '../../../context/UserContext.tsx';
import { indexProjectsInquiries } from '../../../utils/list-api.ts';

type Project = {
  id: number;
  name: string;
  list_type: string;
  updated_at: string;
};

type ProjectsResponse = {
  lists: Project[];
  total_count: number;
  total_pages: number;
  current_page: number;
};

function InquiriesIndex() {
  const { user } = useUser();
  const countPerPage = 10;
  const [page, setPage] = useState(1);
  const [lists, setLists] = useState<ProjectsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLists() {
      setLoading(true);
      try {
        const payload = {
          page: page,
          count_per_page: countPerPage,
        };
        console.log(payload);
        const data = await indexProjectsInquiries(payload);
        console.log(data);
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
        <Link
          to="/inquiry/project/create"
          className="hover:text-hoverc cursor-pointer"
        >
          [Create_Project_For_Inquiries]
        </Link>
      </div>

      <div className="p-10 w-full text-center">
        <h1 className="text-[2rem] text-white pb-2">Inquiries_for_Projects</h1>
        <div className="w-full text-center flex flex-col">
          {loading ? (
            <p>LOADING_DATA...</p>
          ) : (
            lists?.lists?.map((item) => (
              <Link
                key={item.id}
                to={`/inquiry/${item.id}`}
                className="border-b border-edge py-4 cursor-pointer hover:bg-hoverc/10 hover:text-hoverc"
              >
                <span className="font-bold">{item.name}</span>
              </Link>
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

export default InquiriesIndex;
