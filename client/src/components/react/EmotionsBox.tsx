import { emotionList, type Emotions } from "@/enums/emotions";
import { ReactType } from "@/enums/reactType";
import {
  ADD_REACT,
  DELETE_REACT,
  UPDATE_REACT,
} from "@/graphql/mutations/react";
import { GET_USER_REACT_ON_POST } from "@/graphql/queries/react";
import type { React } from "@/interface/react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { BiLike } from "react-icons/bi";

interface EmotionsBoxProps {
  postId: string;
}

export default function EmotionsBox({ postId }: EmotionsBoxProps) {
  const { data } = useQuery<{ getUserReactOnPost: React }>(
    GET_USER_REACT_ON_POST,
    {
      variables: { postId },
    },
  );

  const reaction = data?.getUserReactOnPost;

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
    if (reaction) {
      deleteReact({
        variables: {
          reactId: reaction.id,
        },
      });
    } else {
      setShowEmotions(!showEmotions);
    }
  };

  const handleEmotionSelect = async (emotion: Emotions) => {
    setShowEmotions(false);
    if (!reaction) {
      await addReact({
        variables: {
          value: emotion,
          type: ReactType.POST,
          postId,
        },
      });
    } else {
      await updateReact({
        variables: {
          value: emotion,
          reactId: reaction.id,
        },
      });
    }
  };

  const selectedEmotion = emotionList.find((e) => e.name === reaction?.value);

  return (
    <div className="emotions-box relative">
      <button
        onClick={handleLikeClick}
        className={`center gap-x-1 p-3 w-full ${
          showEmotions
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100"
        }`}
      >
        {reaction ? (
          <img
            src={selectedEmotion?.icon}
            alt={reaction.value}
            className="w-5 h-5"
          />
        ) : (
          <BiLike />
        )}
        <span>{reaction?.value || "Like"}</span>
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
