import mongoose from 'mongoose';

const postingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //saves time of creation and date
);

const Post = mongoose.model('Post', postingSchema);

export default Post;