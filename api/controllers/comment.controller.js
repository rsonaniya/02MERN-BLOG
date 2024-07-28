import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    console.log({ content, postId, userId });
    if (!content || !userId || !postId) {
      return next(
        errorHandler(
          400,
          "comment,userId and postId is required to post a comment"
        )
      );
    }
    if (userId !== req.user.id) {
      return next(
        errorHandler(
          403,
          "You are not authenticated, Plese login to add a comment"
        )
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
