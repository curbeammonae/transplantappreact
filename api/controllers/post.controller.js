import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
    try {
      const posting = await Post.create(req.body);
      return res.status(201).json(posting);
    } catch (error) {
      next(error);
    }
  };