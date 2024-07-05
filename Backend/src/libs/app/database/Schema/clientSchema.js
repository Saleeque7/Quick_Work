import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
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
    islike: {
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
      type: String,
    },
    isClientProfile: {
      type: Boolean,
      default: false,
    },
    jobPosts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
    }],
  },
  {
    timestamps: true,
  }
);

clientSchema.index({ email: 1 });
const Client = mongoose.model("Client", clientSchema);

export { Client };
