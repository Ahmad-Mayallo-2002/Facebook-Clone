import { GET_POSTS } from "@/graphql/queries";
import type { GetPosts } from "@/interface/response";
import { useQuery } from "@apollo/client/react";
import Post from "./Post";

export default function Posts() {
  const { data } = useQuery<GetPosts>(GET_POSTS, {
    variables: {
      take: 20,
      skip: 0,
    },
  });
  return (
    <>
      {data?.getPosts.data.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
}
