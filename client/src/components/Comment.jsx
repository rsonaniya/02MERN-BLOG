import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

//eslint-disable-next-line
const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        //eslint-disable-next-line
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [comment]);

  return (
    <div className="flex p-4 border-b dark:border-b-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilPicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>

          <span className="text-gray-500 text-xs">
            {/* eslint-disable-next-line */}
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {/* eslint-disable-next-line */}
        <p className="text-gray-500 mb-2">{comment.content}</p>
        <div className="flex items-center pt-2 text-xs gap-2 border-t dark:border-gray-700 max-w-fit">
          <button
            type="button"
            // eslint-disable-next-line
            onClick={() => onLike(comment._id)}
            className={`${
              currentUser && comment.likes.includes(currentUser._id)
                ? "text-blue-500"
                : "text-gray-400"
            } hover:text-blue-500`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-500">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
