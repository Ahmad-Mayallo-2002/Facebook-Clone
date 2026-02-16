import { emotionList, type Emotions } from "@/enums/emotions";
import { ReactType } from "@/enums/reactType";
import {
  ADD_REACT,
  DELETE_REACT,
  UPDATE_REACT,
} from "@/graphql/mutations/react";
import { GET_USER_REACT_ON_POST } from "@/graphql/queries/react";
import type { React } from "@/interface/react";
import { useMeQuery } from "@/utils/user";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { BiLike } from "react-icons/bi";

export default function EmotionsBox({ postId }: { postId: string }) {
  const { user } = useMeQuery();
  const { data } = useQuery<{ getUserReactOnPost: React }>(
    GET_USER_REACT_ON_POST,
    {
      variables: {
        postId,
        userId: user?.id,
      },
    },
  );

  const [showEmotions, setShowEmotions] = useState(false);

  const [addReact] = useMutation<{ addReact: string }>(ADD_REACT, {
    refetchQueries: ["GetPostReacts", "GetUserReactOnPost"],
  });
  const [updateReact] = useMutation<{ updateReact: string }>(UPDATE_REACT, {
    refetchQueries: ["GetPostReacts", "GetUserReactOnPost"],
  });
  const [deleteReact] = useMutation<{ deleteReact: string }>(DELETE_REACT, {
    refetchQueries: ["GetPostReacts", "GetUserReactOnPost"],
  });

  const handleLikeClick = () => {
    if (data?.getUserReactOnPost) {
      deleteReact({
        variables: {
          reactId: data?.getUserReactOnPost.id,
        },
      });
    } else {
      setShowEmotions(!showEmotions);
    }
  };

  const handleEmotionSelect = async (emotion: Emotions) => {
    setShowEmotions(false);
    if (!data?.getUserReactOnPost) {
      await addReact({
        variables: {
          value: emotion,
          postId,
          type: ReactType.POST,
        },
      });
    } else {
      await updateReact({
        variables: {
          value: emotion,
          reactId: data.getUserReactOnPost.id,
        },
      });
    }
  };

  const selectedEmotion = emotionList.find(
    (e) => e.name === data?.getUserReactOnPost.value,
  );

  return (
    <div className="emotions-box relative">
      {/* If No React Exist */}
      <button
        onClick={handleLikeClick}
        className={`center gap-x-1 p-3 w-full ${
          showEmotions
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100"
        }`}
      >
        {data?.getUserReactOnPost ? (
          <img
            src={selectedEmotion?.icon}
            alt={data?.getUserReactOnPost.value}
            className="w-5 h-5"
          />
        ) : (
          <BiLike />
        )}
        <span>{data?.getUserReactOnPost.value || "Like"}</span>
      </button>
      {showEmotions && (
        <div className="flex w-fit h-fit gap-3 absolute bg-white p-3 rounded-full top-[-50%] translate-x-[20%]">
          {emotionList.map(({ name, icon }) => (
            <button
              className="cursor-pointer"
              key={name}
              onClick={() => handleEmotionSelect(name)}
            >
              <img src={icon} alt={name} className="w-5 h-5 mx-auto" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
