import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

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

export const getPostComments = async (req, res, next) => {
  const { postId } = req.params;
  if (!postId) {
    return next(errorHandler(400, "A valid post id is required"));
  }
  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  const { commentId } = req.params;
  if (!commentId) {
    return next(errorHandler(404, "A Comment id is required"));
  }
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  const { commentId } = req.params;
  if (!commentId || !req.body.content) {
    return next(errorHandler(404, "Comment id and content are required "));
  }
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not authorized to edit this comment")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  if (!commentId) {
    return next(errorHandler(404, "Comment id is required "));
  }
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(404, "No comment found with given id"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not authorized to delete this comment")
      );
    }
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json("comment has been deleted successfully");
  } catch (error) {
    return next(error);
  }
};

export const getComments = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to access this route"));
  }
  try {
    const startIndex = req.query.startIndex * 1 || 0;
    const limit = req.query.limit * 1 || 9;
    const sortDirection = req.query.sort === "asc" ? -1 : 1;
    const comments = await Comment.find()
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: sortDirection });
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComment = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      totalComments,
      lastMonthComment,
      comments,
    });
  } catch (error) {
    return next(error);
  }
};
