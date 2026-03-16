import { mainEndPoint } from "@/assets/assets";
import { emotionList } from "@/enums/emotions";
import { GET_POST_REACTS } from "@/graphql/queries/react";
import type { GetPostReacts } from "@/interface/response";
import { useLazyQuery } from "@apollo/client/react";
import { useState } from "react";
import { FaX } from "react-icons/fa6";

export default function EmotionsDialog({ postId }: { postId: string }) {
  const TAKE = 20;
  const [show, setShow] = useState(false);
  const [getPostReacts, { data, error, loading, fetchMore }] =
    useLazyQuery<GetPostReacts>(GET_POST_REACTS);

  const handleOpenClose = () => {
    setShow(!show);
    if (!show) {
      getPostReacts({
        variables: {
          postId,
          take: TAKE,
          skip: 0,
        },
      });
    }
  };

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        postId,
        take: TAKE,
        skip: data?.getPostReacts.data.length,
      },
    });
  };
  return (
    <>
      <div className="emotions-dialog">
        {/* Trigger */}
        <button
          onClick={handleOpenClose}
          className="trigger flex w-fit cursor-pointer text-gray-400"
        >
          {emotionList.map((e, i) => (
            <img src={e.icon} key={i} className={i ? "-ml-[5px]" : ""} />
          ))}
        </button>
        {/* Backdrop */}
        <div
          hidden={!show}
          className="backdrop"
          onClick={handleOpenClose}
        ></div>
        {/* Content */}
        <div
          hidden={!show}
          className="content dialog-content rounded-lg center-position"
        >
          <header className="center-y justify-between p-3 border-b border-gray-400 mb-3">
            <h4 className="text-black">All Emotions</h4>
            <button
              onClick={() => setShow(false)}
              className="rounded-full p-3 cursor-pointer hover:bg-gray-100 text-black"
            >
              <FaX />
            </button>
          </header>

          {error && !data && (
            <div className="w-full h-50 center">
              <h4>{error.message}</h4>
            </div>
          )}

          {loading && !data && (
            <>
              <div className="h-75 w-full center">
                <div className="animate-spin border-4 border-t-transparent border-blue-500 w-16 h-16 rounded-full"></div>
              </div>
            </>
          )}

          {data && (
            <>
              <ul className="p-4 pt-0 space-y-6 max-h-[300px] overflow-y-auto">
                {data?.getPostReacts.data.map((react) => (
                  <li key={react.id} className="center-y justify-between">
                    <div className="user center-y gap-x-2">
                      <div className="image">
                        <img
                          className="w-6 h-6 rounded-full"
                          src={
                            react.user?.image.public_id
                              ? react.user?.image.url
                              : mainEndPoint + react.user?.image.url
                          }
                          alt="asd"
                        />
                      </div>
                      <h4 className="font-semibold! text-sm">
                        {react.user?.username}
                      </h4>
                    </div>
                    <span>
                      {emotionList.map(
                        ({ name, icon }, i) =>
                          react.value === name && (
                            <img key={i} className="w-6 h-6" src={icon} />
                          ),
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {data?.getPostReacts.pagination.next && (
                <button
                  onClick={handleFetchMore}
                  className="my-4 block font-bold cursor-pointer w-fit mx-auto"
                >
                  Show More
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
