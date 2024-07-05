import mongoose from "mongoose";
import { experienceSchema } from "./experienceSchema.js";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    job_role: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isLike: {
      type: Boolean,
      default: false,
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
    isGithub: {
      type: Boolean,
      default: false,
    },
    profile: {
      location: {
        type: String,
      },
      key: {
        type: String,
      },
    },
    isUserProfile: {
      type: Boolean,
      default: false,
    },
    jobTitle: {
      type: String,
      default: "",
      uppercase: true,
    },
    overview: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    hourlyRate: {
      type: Number,
      default: 0,
    },
    dateOfBirth: {
      type: Date,
    },
    State: {
      type: String,
    },
    experiences: [experienceSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export { User };
