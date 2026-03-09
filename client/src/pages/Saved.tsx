import HeaderFeed from "@/components/headers/HeaderFeed";
import { GET_USER_SAVE_LIST } from "@/graphql/queries/saveList";
import type { SaveList } from "@/interface/saved";
import { useQuery } from "@apollo/client/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Post from "@/components/post/Post";

export default function Saved() {
  const { userId } = useParams();
  const { data, error, loading } = useQuery<{ getUserSaveList: SaveList }>(
    GET_USER_SAVE_LIST,
    {
      variables: {
        userId,
      },
    },
  );
  return (
    <>
      <HeaderFeed />
      <section className="saved mt-36">
        <div className="container space-y-4">
          {!data && (
            <div className="center h-[calc(100vh-36px*6)]">
              {loading && (
                <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-6xl" />
              )}
              {error && (
                <h3 className="text-center text-gray-900 text-4xl">
                  {error.message}
                </h3>
              )}
            </div>
          )}
          {data &&
            data.getUserSaveList.saveItems.map(({ post }, i) => (
              <Post post={post} userId={`${userId}`} key={i} />
            ))}
        </div>
      </section>
    </>
  );
}
