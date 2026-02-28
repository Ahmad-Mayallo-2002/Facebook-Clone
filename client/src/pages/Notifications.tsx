import { timeAgo } from "@/assets/assets";
import HeaderFeed from "@/components/headers/HeaderFeed";
import { GET_RECEIVER_NOTIFICATIONS } from "@/graphql/queries/notification";
import type { Notification } from "@/interface/notification";
import type { PaginatedData } from "@/interface/pagination";
import { getUrl } from "@/utils/getImageUrl";
import { connectSocket } from "@/utils/socket";
import { useMeQuery } from "@/utils/user";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Notifications() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const { data, error, loading } = useQuery<{
    getReceiverNotifications: PaginatedData<Notification>;
  }>(GET_RECEIVER_NOTIFICATIONS, {
    variables: {
      take: 10,
      skip: 0,
    },
  });
  const { user } = useMeQuery();
  useEffect(() => {
    const socket = connectSocket(user?.id as string);
    socket.on("notify_post_owner", (data) => {
      setNotification(data);
    });
  }, [user?.id]);
  return (
    <>
      <HeaderFeed />
      <section className="notifications mt-[calc(12*4px+72px)]">
        <div className="container">
          <h2 className="text-gray-900 text-3xl mb-4">Notifications</h2>
          {loading && (
            <div className="h-75 center">
              <AiOutlineLoading3Quarters className="animate-spin text-5xl text-blue-500" />
            </div>
          )}

          {error && (
            <div className="h-75 center">
              <h3 className="text-gray-900 tex-center text-xl">
                {error.message}
              </h3>
            </div>
          )}

          {data && (
            <ul className="space-y-4">
              {notification && (
                <li className="bg-blue-50 p-2">
                  <div className="sender flex gap-x-3">
                    <div className="image">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={
                          notification?.sender.image ?
                          getUrl(notification?.sender?.image) : undefined
                        }
                        alt={notification?.sender.username}
                      />
                    </div>
                    <div>
                      <p className="text-gray-400">{notification?.content}</p>
                      <small className="text-gray-400">
                        {timeAgo(notification?.createdAt)}
                      </small>
                    </div>
                  </div>
                </li>
              )}

              {data.getReceiverNotifications?.data.map((n, i) => (
                <li key={i} className="bg-blue-50 p-2">
                  <div className="sender flex gap-x-3">
                    <div className="image">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={n.sender.image.url && getUrl(n.sender.image)}
                        alt={n?.sender.username}
                      />
                    </div>
                    <div>
                      <p className="text-gray-400">{n.content}</p>
                      <small className="text-gray-400">
                        {timeAgo(n.createdAt)}
                      </small>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
