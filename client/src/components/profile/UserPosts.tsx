import { useQuery } from "@apollo/client/react";
import { GET_USER_POSTS } from "@/graphql/queries/post";
import type { PaginatedData } from "@/interface/pagination";
import type { Post as IPost } from "@/interface/post";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Post from "../feed/post/Post";
import type { User } from "@/interface/user";

export default function UserPosts({user}: {user: User | null}) {
  const { data, error, loading } = useQuery<{
    getUserPosts: PaginatedData<IPost>;
  }>(GET_USER_POSTS, {
    variables: {
      take: 20,
      skip: 0,
      userId: user?.id,
    },
  });
  return (
    <>
      <div className="user-posts">
        {data &&
          data.getUserPosts.data.map((post) => (
            <Post key={post.id} post={post} user={user as User} />
          ))}

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
