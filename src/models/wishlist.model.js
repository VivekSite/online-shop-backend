import { Schema, model } from "mongoose";

const whishListSchema = new Schema({
  title: {
    type: String,
    minLength: 3,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
    }
  ],
  updated_at: {
    type: Number,
    default: () => +new Date(),
  },
  created_at: {
    type: Number,
    default: () => +new Date(),
  },
}, {
  timestamps: true,
});

export const whichListModel = new model('whish_list', whishListSchema);