import { emotionList, type Emotions } from "@/enums/emotions";
import { ReactType } from "@/enums/reactType";
import { ADD_REACT, DELETE_REACT, UPDATE_REACT } from "@/graphql/mutations";
import { GET_USER_REACT_ON_POST } from "@/graphql/queries";
import type { React } from "@/interface/react";
import { useMeQuery } from "@/utils/user";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { BiLike } from "react-icons/bi";

export default function EmotionsBox({ postId }: { postId: string }) {
  const { user } = useMeQuery();
  const { data: userReact } = useQuery<{ getUserReactOnPost: React }>(
    GET_USER_REACT_ON_POST,
    {
      variables: {
        postId,
        userId: user?.id,
      },
    },
  );

  const [showEmotions, setShowEmotions] = useState(false);
  const [chosenEmotion, setChosenEmotion] = useState<Emotions | null>(
    userReact?.getUserReactOnPost.value ?? null,
  );

  const [addReact] = useMutation<{ addReact: string }>(ADD_REACT, {
    refetchQueries: ["GetPostReacts"],
  });
  const [updateReact] = useMutation<{ updateReact: string }>(UPDATE_REACT, {
    refetchQueries: ["GetPostReacts"],
  });
  const [deleteReact] = useMutation<{ deleteReact: string }>(DELETE_REACT, {
    refetchQueries: ["GetPostReacts"],
  });

  const handleLikeClick = () => {
    if (chosenEmotion) {
      setChosenEmotion(null);
      deleteReact({
        variables: {
          reactId: userReact?.getUserReactOnPost.id,
        },
        refetchQueries: ["GetPostReacts"],
      });
    } else {
      setShowEmotions(!showEmotions);
    }
  };

  const handleEmotionSelect = (emotion: Emotions) => {
    setChosenEmotion(emotion);
    setShowEmotions(false);
    if (!userReact?.getUserReactOnPost) {
      addReact({
        variables: {
          value: emotion,
          postId,
          type: ReactType.POST,
        },
      });
    } else {
      updateReact({
        variables: {
          value: emotion,
          reactId: userReact.getUserReactOnPost.id,
        },
      });
    }
  };

  return (
    <div className="emotions-box relative">
      {/* If No React Exist */}
      <button
        onClick={handleLikeClick}
        disabled={showEmotions}
        className={`center gap-x-1 p-3 w-full ${
          showEmotions
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100"
        }`}
      >
        {chosenEmotion ? (
          <img
            src={emotionList.find((e) => e.name === chosenEmotion)?.icon || ""}
            alt={chosenEmotion}
            className="w-5 h-5"
          />
        ) : (
          <BiLike />
        )}
        <span>{chosenEmotion || "Like"}</span>
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
