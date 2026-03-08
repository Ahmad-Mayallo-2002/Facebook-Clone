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
      <section className="saved">
        <div className="container">
          {!data && (
            <div className="center h-screen">
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
            data.getUserSaveList.saveItems.map((v) => (
              <Post post={v.post} userId={`${userId}`} key={v.postId} />
            ))}
        </div>
      </section>
    </>
  );
}
