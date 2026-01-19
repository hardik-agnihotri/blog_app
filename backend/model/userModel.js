import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  isGhost:{
    type:Boolean
  }
},{ timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
