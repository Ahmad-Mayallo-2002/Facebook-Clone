import { useQuery } from "@apollo/client/react";
import { GET_USER_POSTS } from "@/graphql/queries/post";
import type { PaginatedData } from "@/interface/pagination";
import type { Post as IPost } from "@/interface/post";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Post from "../feed/post/Post";

export default function UserPosts({ userId }: { userId: string }) {
  const TAKE = 10;
  const { data, error, loading, fetchMore } = useQuery<{
    getUserPosts: PaginatedData<IPost>;
  }>(GET_USER_POSTS, {
    variables: {
      take: TAKE,
      skip: 0,
      userId,
    },
  });

  const handleNext = () => {
    fetchMore({
      variables: {
        take: TAKE,
        skip: data?.getUserPosts?.data.length ?? 0,
        userId,
      },
    });
  };
  return (
    <>
      <div className="user-posts">
        {data && (
          <>
            <div className="posts space-y-4">
              {data.getUserPosts.data.map((post) => (
                <Post key={post.id} post={post} userId={userId} />
              ))}
            </div>
            {data.getUserPosts.pagination.next && (
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
          <h2 className="text-2xl text-gray-400 font-bold">{error.message}</h2>
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
