import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
    try {
      const posting = await Post.create(req.body);
      return res.status(201).json(posting);
    } catch (error) {
      next(error);
    }
  };

  export const deletePost = async (req, res, next) => {
    const posting = await Post.findById(req.params.id);
  
    if (!posting) {
      return next(errorHandler(404, 'Listing not found!'));
    }
  
    if (req.user.id !== posting.userRef) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }
  
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
      next(error);
    }
  };

  export const updatePost = async (req, res, next) => {
    const posting = await Post.findById(req.params.id);
    if (!posting) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== posting.userRef) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  };

  export const getPost = async (req, res, next) => {
    try {
      const posting = await Post.findById(req.params.id);
      if (!posting) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(posting);
    } catch (error) {
      next(error);
    }
  };


  export const getAllPosts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const posts = await Post.find({
        ...(req.query.title && { title: req.query.title }),
        ...(req.query.description && { description: req.query.description }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { description: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const totalPosts = await Post.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
      });
    } catch (error) {
      next(error);
    }
  };