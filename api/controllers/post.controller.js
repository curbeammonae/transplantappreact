import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

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
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const posts = await Post.find({
        title: { $regex: searchTerm, $options: 'i' },
       
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

  export const likePost = async (req, res, next) => {
    try {
      const likeExist = await Post.findById(req.params.id)
      const userIndex = likeExist.likes.indexOf(req.user.id)
      if(userIndex === -1){
        likeExist.likes.push(req.user.id)
      }else{
        likeExist.likes.splice(userIndex, 1)
      }
      await likeExist.save()
      res.status(200).json(likeExist)
    } catch (error) {
      next(error)
    }
   
  }