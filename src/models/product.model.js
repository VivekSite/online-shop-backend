import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    minLength: 3,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'sellers',
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  about: [
    {
      type: String,
      minlength: 10
    }
  ],
  details: [
    { key: String, value: String }
  ],
  images: [
    { type: String }
  ],
  tags: [
    { type: String }
  ],
  updated_at: {
    type: Number,
    default: () => +new Date(),
  },
  created_at: {
    type: Number,
    default: () => +new Date(),
  },
}, { timestamps: true });

export const productModel = new model('products', productSchema);