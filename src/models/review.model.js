import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  rating: {
    type: Number,
    min: 1, 
    max: 5,
    required: true,
  },
  images: [
    {
      type: String,
    }
  ],
  content: {
    type: String,
  }
}, { timestamps: true });

export const reviewModel = new model('reviews', reviewSchema);