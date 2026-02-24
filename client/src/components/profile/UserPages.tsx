import { GET_USER_PAGES } from "@/graphql/queries/page";
import type { Page } from "@/interface/page";
import type { PaginatedData } from "@/interface/pagination";
import { defaultImages } from "@/utils/defaultImages";
import { getUrl } from "@/utils/getImageUrl";
import { useQuery } from "@apollo/client/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function UserPages({ userId }: { userId: string }) {
  const { data, error, loading } = useQuery<{
    getUserPages: PaginatedData<Page>;
  }>(GET_USER_PAGES, {
    variables: {
      take: 20,
      skip: 0,
      userId,
    },
  });

  return (
    <div className="user-pages panel mb-4">
      <h3 className="text-2xl text-gray-900 mb-3">My Pages</h3>

      {loading && (
        <div className="center h-75">
          <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-7xl" />
        </div>
      )}

      {error && (
        <div className="center h-75">
          <h4 className="text-gray-900 text-xl">{error.message}</h4>
        </div>
      )}

      {data && (
        <ul>
          {data.getUserPages?.data?.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No pages created yet.
            </p>
          )}
          {data.getUserPages?.data?.map((page) => (
            <li key={page.id} className="mb-3">
              <Link
                to={`/page/${page.id}`}
                className="center-y gap-x-4 hover:bg-gray-100 p-2 rounded-md transition"
              >
                <img
                  src={
                    page.image.public_id
                      ? getUrl(page.image)
                      : defaultImages.defaultUserMaleImage
                  }
                  alt="Page image"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {page.description
                      ? page.description.slice(0, 30) +
                        (page.description.length > 30 ? "..." : "")
                      : "Untitled Page"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
