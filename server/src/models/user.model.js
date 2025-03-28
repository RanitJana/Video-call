import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
    trim: true,
    default: "",
  },
});

const User = model("User", userSchema);

export default User;
