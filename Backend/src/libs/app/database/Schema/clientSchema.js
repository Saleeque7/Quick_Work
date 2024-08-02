import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
      enum: [
        'Payment received',
        'Refund received',
        'Withdrawal',
      
      ], 
    },
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract', 
      required: true,
    },
    status: {
      type: String,
      enum: ['credit', 'debit'],
      default: 'credit',
  },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


const walletSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [transactionSchema],
  },
  {
    _id: false,
  },
  {
    timestamps: true,
  }
);


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
    spentAmount: {
      type: Number,
      default: 0,
    },
    address: {
      address: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: Number,
      }
    },
    wallet: walletSchema,  
  },
  {
    timestamps: true,
  }
);

clientSchema.index({ email: 1 });
const Client = mongoose.model("Client", clientSchema);

export { Client };
