import mongoose, { Schema } from "mongoose";

const apikeySchema = new Schema(
  {
    apikey: {
      type: String,
      required: true
    },
    updated_at: {
      type: Number,
      default: () => +new Date(),
    },
    created_at: {
      type: Number,
      default: () => +new Date(),
    },
  },
);

const apikeyModel = mongoose.model("apikeys", apikeySchema);
export { apikeyModel };
