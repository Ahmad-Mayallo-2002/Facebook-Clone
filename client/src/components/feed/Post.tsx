import { mainEndPoint } from "@/assets/assets";
import { emotionList, Emotions } from "@/enums/emotions";
import { useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComment, FaShare } from "react-icons/fa";
import EmotionsDialog from "./post/EmotionsDialog";
import type { Post } from "@/interface/post";
import CommentsDialog from "./post/CommentsDialog";
import CreateComment from "./post/CreateComment";

export default function Post({
  user,
  createdAt,
  content,
  media,
  reacts,
  comments,
  id,
}: Post) {
  const created = new Date(createdAt);
  const diff = new Date().getTime() - created.getTime();
  const [showEmotions, setShowEmotions] = useState(false);
  const [chosenEmotion, setChosenEmotion] = useState<Emotions | null>(null);
  const [showComment, setShowComment] = useState(false);

  const handleLikeClick = () =>
    chosenEmotion ? setChosenEmotion(null) : setShowEmotions(!showEmotions);

  const handleEmotionSelect = (emotion: Emotions) => {
    setChosenEmotion(emotion);
    setShowEmotions(false);
  };

  return (
    <div className="post bg-white rounded-lg mt-4 shadow-sm">
      <header className="p-3 sm:p-4 post-author">
        <div className="user center-y gap-x-2">
          <img
            src={
              user.image.public_id
                ? user.image.url
                : mainEndPoint + user.image.url
            }
            alt={user.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="username-date">
            <h4 className="text-gray-900 text-sm">{user.username}</h4>
            <small className="text-gray-500 text-xs">
              {new Date(diff).getHours() + "h"} ago
            </small>
          </div>
        </div>
      </header>

      <section className="post-content">
        {content ? <p className="p-3 pt-0">{content}</p> : ""}
        {media && media.length
          ? media.map((m, i) => <img key={i} src={m.url} alt="Image" />)
          : null}
      </section>

      <footer className="post-actions">
        <div className="counts p-3 pt-0 center-y justify-between text-gray-400">
          <EmotionsDialog reacts={reacts} />
          <CommentsDialog comments={comments} />
        </div>

        <div
          className={`grid grid-cols-3 text-gray-600 border-gray-200 border-t ${!showComment ? "border-b" : ""}`}
        >
          <div className="emotions-box relative">
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
                  src={
                    emotionList.find((e) => e.name === chosenEmotion)?.icon ||
                    ""
                  }
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
          <button
            onClick={() => setShowComment(!showComment)}
            className="center gap-x-1 p-3 cursor-pointer hover:bg-gray-100"
          >
            <FaRegComment />
            <span>Comment</span>
          </button>
          <button className="center gap-x-1 p-3 cursor-pointer hover:bg-gray-100">
            <FaShare />
            <span>Share</span>
          </button>
        </div>

        <CreateComment
          setShowComment={setShowComment}
          postId={id}
          showComment={showComment}
        />
      </footer>
    </div>
  );
}
