import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  shipping_address: {
    type: Schema.Types.ObjectId,
    ref: 'addresses',
    required: true
  },
  payment_method: {
    type: String,
    enum: ["Pay on Delivery", "UPI", "Credit Card"],
    default: 'Pay on Delivery'
  },
  delivered_at: {
    type: Number,
  },
  order_summary: {
    Subtotal: Number,
    Shipping: Number,
    Cash: Number,
    Total: Number,
    Promotion_Applied: Number,
    GrandTotal: Number
  },
  is_cancelled: {
    type: Boolean,
    default: false,
  },
  cancelled_at: {
    type: Number,
  },
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

export const orderModel = new model('orders', orderSchema);