import HeaderFeed from "@/components/headers/HeaderFeed";
import { SEARCH_POSTS } from "@/graphql/queries/post";
import type { PaginatedData } from "@/interface/pagination";
import type { Post as IPost } from "@/interface/post";
import type { RootState } from "@/redux/store";
import { useQuery } from "@apollo/client/react";
import { useSelector } from "react-redux";
import Post from "@/components/post/Post";
import { useMeQuery } from "@/utils/user";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ISearchPost = { searchPosts: PaginatedData<IPost> };

export default function Search() {
  const TAKE: number = 20;
  const { user } = useMeQuery();
  const search = useSelector((state: RootState) => state.search.search);
  const { data, error, loading, fetchMore } = useQuery<ISearchPost>(
    SEARCH_POSTS,
    {
      variables: {
        take: TAKE,
        skip: 0,
        search,
      },
    },
  );

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        take: TAKE,
        skip: data?.searchPosts?.data?.length ?? 0,
        search,
      },
    });
  };
  return (
    <>
      <HeaderFeed />
      <section className="searched-posts mt-36">
        <div className="container">
          {!data && (
            <div className="center h-[calc(100vh-36*4px)]">
              {loading && (
                <div>
                  <AiOutlineLoading3Quarters className="text-blue-500 text-5xl animate-spin" />
                </div>
              )}
              {error && (
                <h3 className="text-gray-900 text-4xl">{error.message}</h3>
              )}
            </div>
          )}
          {data && (
            <>
              <div className="posts space-y-4">
                {data?.searchPosts.data.map((post) => (
                  <Post key={post.id} post={post} userId={user?.id ?? ""} />
                ))}
              </div>
              {data?.searchPosts.pagination.next && (
                <button
                  onClick={handleFetchMore}
                  disabled={loading}
                  className="main-button blue-button mt-4 mb-2 block mx-auto cursor-pointer"
                >
                  show more
                </button>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
