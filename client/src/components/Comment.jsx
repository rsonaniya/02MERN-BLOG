import { useEffect, useState } from "react";
import moment from "moment";

//eslint-disable-next-line
const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
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
      </div>
    </div>
  );
};

export default Comment;
