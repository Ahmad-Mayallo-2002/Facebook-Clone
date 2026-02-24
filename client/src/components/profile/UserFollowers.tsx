import { GET_USER_FOLLOWERS } from "@/graphql/queries/follow";
import type { Follow } from "@/interface/follow";
import type { PaginatedData } from "@/interface/pagination";
import { getUrl } from "@/utils/getImageUrl";
import { useQuery } from "@apollo/client/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function UserFollowers({ userId }: { userId: string }) {
  const { data, error, loading } = useQuery<{
    getUserFollowers: PaginatedData<Follow>;
  }>(GET_USER_FOLLOWERS, {
    variables: {
      take: 20,
      skip: 0,
      userId,
    },
  });
  return (
    <div className="user-followers panel mb-4">
      <h3 className="mb-4 text-2xl text-gray-900">My Followers</h3>
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
          {data?.getUserFollowers.data.map((follow) => (
            <li key={follow.id}>
              <Link
                className="center-y gap-x-4"
                to={`/profile/${follow.follower.id}`}
              >
                <img
                  src={getUrl(follow.follower.image)}
                  alt={follow.follower.username}
                  className="h-12 w-12 rounded-full"
                />
                <p>{follow.follower.username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
