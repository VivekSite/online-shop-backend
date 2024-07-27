import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
    }
  ]
});



export const shoppingCart = new model('shopping_cart', shoppingCartSchema);