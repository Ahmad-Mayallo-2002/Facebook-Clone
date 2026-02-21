import { mainEndPoint, timeAgo } from "@/assets/assets";
import { useState } from "react";
import { FaRegComment, FaShare } from "react-icons/fa";
import EmotionsDialog from "../react/EmotionsDialog";
import type { Post } from "@/interface/post";
import CommentsDialog from "../comment/CommentsDialog";
import CreateComment from "../comment/CreateComment";
import EmotionsBox from "../react/EmotionsBox";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { HiDotsVertical } from "react-icons/hi";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import UpdatePost from "./UpdatePost";
import { DELETE_POST } from "@/graphql/mutations/post";
import { Link } from "react-router-dom";

interface PostProps {
  post: Post;
  userId: string;
}

export default function Post({ post, userId }: PostProps) {
  const [showComment, setShowComment] = useState(false);
  const [open, setOpen] = useState(false);

  const [deletePost, { error }] = useMutation(DELETE_POST);

  const handleDeletePost = () => {
    deletePost({
      variables: {
        id: post.id,
      },
      refetchQueries: ["GetPosts"],
    });
  };

  if (error) toast.error(error.message);

  return (
    <div className="post bg-white rounded-lg shadow-sm">
      <header className="p-3 sm:p-4 post-author center-y justify-between">
        <div className="user center-y gap-x-2">
          <Link to={`/profile/${post.userId}`}>
            <img
              src={
                post.user.image.public_id
                  ? post.user.image.url
                  : mainEndPoint + post.user.image.url
              }
              alt={post.user.username}
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <div className="username-date">
            <Link to={`/profile/${post.userId}`}>
              <h4 className="text-gray-900 text-sm">{post.user.username}</h4>
            </Link>
            <small className="text-gray-500 text-xs">
              {timeAgo(post.createdAt)}
            </small>
          </div>
        </div>

        {post.userId === userId && (
          <div className="menu-actions relative w-10 h-10">
            <Menu
              menuButton={
                <button className="cursor-pointer rounded-full w-full h-full center hover:bg-gray-100">
                  <HiDotsVertical className="text-xl" />
                </button>
              }
              menuClassName="bg-white rounded-lg min-w-40 z-1 !left-[-120px]"
            >
              <MenuItem
                onClick={handleDeletePost}
                className="p-3 text-red-500 cursor-pointer hover:bg-gray-100 rounded-t-lg"
              >
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => setOpen(true)}
                className="p-3 cursor-pointer hover:bg-gray-100 rounded-b-lg"
              >
                Update
              </MenuItem>
            </Menu>
          </div>
        )}
      </header>

      {open && <UpdatePost setOpen={setOpen} postId={post.id} />}

      <section className="post-content">
        {post.content ? <p className="p-3 pt-0">{post.content}</p> : ""}
        {post.media && post.media.length
          ? post.media.map((m, i) => <img key={i} src={m.url} alt="Image" />)
          : null}
      </section>

      <footer className="post-actions mt-3">
        <div className="counts p-3 pt-0 center-y justify-between">
          <EmotionsDialog postId={post.id} />
          <CommentsDialog postId={post.id} authorId={userId} />
        </div>

        <div
          className={`grid grid-cols-3 text-gray-600 border-gray-200 border-t ${!showComment ? "border-b" : ""}`}
        >
          <EmotionsBox postId={post.id} />
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
          postId={post.id}
          showComment={showComment}
        />
      </footer>
    </div>
  );
}
