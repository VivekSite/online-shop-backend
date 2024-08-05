import { Schema, model } from "mongoose";

const sellerSchema = new Schema({
  user_id: {
    type: String,
    ref: 'users',
    required: true
  },
  merchant_name: {
    type: String,
    minLength: 5,
    required: true
  },
  gst: {
    type: String,
    required: true
  },
  pan: {
    type: String,
    required: true
  },
  bank_details: {
    bank: String,
    account_number: String,
    ifsc: String,
    micr: String,
  },
  is_bank_verified: {
    type: Boolean,
    default: false,
  },
  packaging_service: {
    type: String,
    enum: ["Own", "By Platform"],
    default: "Own",
  },
  shipping_service: {
    type: String,
    enum: ["Own", "By Platform"],
    default: 'Own',
  },
  is_deleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export const sellerModel = new model('sellers', sellerSchema);