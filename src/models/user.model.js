import mongoose, { Schema } from "mongoose";
import {
  emailValidator,
} from "../validations/auth.validation.js";

const userSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3 },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [emailValidator, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: { type: String, default: "" },
    isEmailVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    updated_at: {
      type: Number,
      default: () => +new Date(),
    },
    created_at: {
      type: Number,
      default: () => +new Date(),
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({
  email: 1,
});

userSchema.index({
  name: 1,
});

const userModel = mongoose.model("Users", userSchema);
export { userModel };
