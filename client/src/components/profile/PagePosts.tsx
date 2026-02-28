import { useQuery } from "@apollo/client/react";
import { GET_PAGE_POSTS } from "@/graphql/queries/post";
import type { PaginatedData } from "@/interface/pagination";
import type { Post as IPost } from "@/interface/post";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Post from "../feed/post/Post";
import { useMeQuery } from "@/utils/user";

export default function PagePosts({ pageId }: { pageId: string }) {
  const TAKE = 10;
  const { user } = useMeQuery();
  const { data, error, loading, fetchMore } = useQuery<{
    getPagePosts: PaginatedData<IPost>;
  }>(GET_PAGE_POSTS, {
    variables: {
      take: TAKE,
      skip: 0,
      pageId,
    },
  });

  const handleNext = () => {
    fetchMore({
      variables: {
        take: TAKE,
        skip: data?.getPagePosts?.data.length ?? 0,
        pageId,
      },
    });
  };

  return (
    <>
      <div className="page-posts">
        {data && (
          <>
            <div className="posts space-y-4">
              {data.getPagePosts.data.map((post) => (
                <Post key={post.id} post={post} userId={user?.id || ""} />
              ))}
            </div>
            {data.getPagePosts.pagination.next && (
              <button
                onClick={handleNext}
                className="my-4 font-bold block w-fit mx-auto cursor-pointer"
              >
                show more
              </button>
            )}
          </>
        )}

        {error && (
          <div className="center h-75">
            <h2 className="text-2xl text-gray-400 font-bold">
              {error.message}
            </h2>
          </div>
        )}

        {loading && (
          <div className="center h-75">
            <AiOutlineLoading3Quarters className="animate-spin text-blue-500 w-15 h-15" />
          </div>
        )}
      </div>
    </>
  );
}
