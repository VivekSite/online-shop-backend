import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
  },
  shipping_address: {
    type: Schema.Types.ObjectId,
    ref: 'addresses',
    required: true
  },
  shipping_status: {
    type: String,
    enum: ["pending", "complete", "cancelled"],
    default: "pending"
  },
  payment_method: {
    type: String,
    enum: ["Pay on Delivery", "UPI", "Credit Card"],
    default: 'Pay on Delivery'
  },
  payment_status: {
    type: String,
    enum: ["pending", "complete", "cancelled"],
    default: 'pending'
  },
  delivered_at: {
    type: Number,
  },
  order_summary: {
    Subtotal: Number,
    Shipping: Number,
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


orderSchema.index({
  user_id: 1
})

export const orderModel = new model('orders', orderSchema);