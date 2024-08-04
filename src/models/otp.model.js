import { model, Schema } from "mongoose";

const otpSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  exp: {
    type: Number,
    required: true
  },
  bufferData: {
    type: Buffer,
    required: true
  },
  for: {
    type: String,
    enum: ["mobile", "email"],
    required: true
  },
  created_at: {
    type: Number,
    default: () => +Date.now()
  },
  updated_at: {
    type: Number,
    default: () => +Date.now()
  }
}, {
  timestamps: true,
})

otpSchema.index({
  user_id: 1
});

export const otpModel = new model("opts", otpSchema);