import type { GetPosts } from "@/interface/response";
import { useQuery } from "@apollo/client/react";
import Post from "./Post";
import { useMeQuery } from "@/utils/user";
import { GET_POSTS } from "@/graphql/queries/post";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Posts() {
  const TAKE: number = 20;
  const { user } = useMeQuery();
  const { data, fetchMore, loading } = useQuery<GetPosts>(GET_POSTS, {
    variables: {
      take: TAKE,
      skip: 0,
    },
  });

  const handleFetchMore = () => {
    const variables = {
      take: TAKE,
      skip: data?.getPosts?.data.length ?? 0,
    };
    fetchMore({ variables })
      .then((e) => console.log(e))
      .catch((err) => console.log(err));
  };
  return (
    <>
      {data?.getPosts.data.map((post) => (
        <Post key={post.id} post={post} userId={`${user?.id}`} />
      ))}
      {data?.getPosts.pagination.next &&
        (loading ? (
          <div className="my-4 text-center">
            <AiOutlineLoading3Quarters className="mx-auto animate-spin text-blue-500 text-2xl" />
          </div>
        ) : (
          <button
            onClick={handleFetchMore}
            className="my-4 font-bold mx-auto w-fit block cursor-pointer"
          >
            Show More
          </button>
        ))}
    </>
  );
}
