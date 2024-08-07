import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  full_name: {
    type: String,
    required: true,
    minLength: 3
  },
  mobile_number: {
    type: String,
    minLength: 10,
    maxLength: 10,
    required: true
  },
  country: {
    type: String,
    enum: ['india'],
    default: 'india'
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pin_code: {
    type: String,
    minLength: 6,
    maxLength: 6,
    required: true
  },
  landmark: {
    type: String,
  },
  address: {
    type: String,
    required: true
  },
  is_default: {
    type: Boolean,
    default: false
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

addressSchema.index({
  user_id: 1
})

export const addressModel = new model('addresses', addressSchema);