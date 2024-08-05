import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        unique: true,
      },
      quantity: {
        type: Number,
      },
      isSelected: {
        type: Boolean,
        default: false,
      },
    }
  ]
});

shoppingCartSchema.index({
  user_id: 1
})

export const shoppingCartModel = new model('shopping_cart', shoppingCartSchema);