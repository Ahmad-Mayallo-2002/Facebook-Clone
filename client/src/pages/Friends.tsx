import { useQuery } from "@apollo/client/react";
import { GET_USER_FRIENDS } from "@/graphql/queries/friends";
import { useParams } from "react-router-dom";
import type { PaginatedData } from "@/interface/pagination";
import type { Friends } from "@/interface/friends";
import HeaderFeed from "@/components/headers/HeaderFeed";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Friends() {
  const { userId } = useParams();
  const { data, loading, error } = useQuery<{
    getUserFriends: PaginatedData<Friends>;
  }>(GET_USER_FRIENDS, {
    variables: { userId, take: 10, skip: 0 },
  });
  return (
    <>
      <HeaderFeed />
      {!data ? (
        <>
          {loading ? (
            <div className="center h-[calc(100vh-64px)]">
              <AiOutlineLoading3Quarters className="text-blue-500 text-7xl animate-spin" />
            </div>
          ) : (
            <div className="center h-[calc(100vh-64px)]">
              <h3 className="text-gray-900 text-3xl">{error?.message}</h3>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="">
            <h3 className="text-gray-900 text-3xl">
              {data.getUserFriends.data.length}
            </h3>
          </div>
        </>
      )}
    </>
  );
}
