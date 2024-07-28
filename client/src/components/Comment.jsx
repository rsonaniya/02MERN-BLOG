import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

//eslint-disable-next-line
const Comment = ({ comment, onLike, onEdit }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                outline
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* eslint-disable-next-line */}
            <p className="text-gray-500 mb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs gap-2 border-t dark:border-gray-700 max-w-fit">
              <button
                type="button"
                // eslint-disable-next-line
                onClick={() => onLike(comment._id)}
                className={`${
                  // eslint-disable-next-line
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-blue-500"
                    : "text-gray-400"
                } hover:text-blue-500`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-500">
                {/* eslint-disable-next-line */}
                {comment.numberOfLikes > 0 &&
                  // eslint-disable-next-line
                  comment.numberOfLikes +
                    " " +
                    // eslint-disable-next-line
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                // eslint-disable-next-line
                (currentUser._id === comment.userId ||
                  (currentUser && currentUser.isAdmin)) && (
                  <button
                    onClick={handleEdit}
                    type="button"
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
        {/* eslint-disable-next-line */}
      </div>
    </div>
  );
};

export default Comment;
