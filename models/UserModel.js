import mongoose from "mongoose";
import Counter from "./counter.js";
import { isAdult, isChild, parseAndValidateDate } from "../utils/dateUtils.js";

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      index: true,
      minlength: 2,
      maxlength: 50,
    },
    dob: {
      type: Date,
      required: false,
      set: parseAndValidateDate,
      validate: {
        validator: isAdult,
        message: "User must be at least 18 years old.",
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      country: String,
      province: String,
      postalCode: {
        type: String,
        validate: {
          validator: function (v) {
            return /^[A-Za-z0-9]{3} ?[A-Za-z0-9]{3}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid postal code!`,
        },
      },
      street: String,
      apt: String,
    },
    kids: [
      {
        kidId: {
          type: Number,
          // Remove the unique constraint from here
        },
        firstName: {
          type: String,
          required: true,
          trim: true,
        },
        lastName: {
          type: String,
          required: true,
          trim: true,
          index: true,
        },
        dob: {
          type: Date,
          set: parseAndValidateDate,
          validate: {
            validator: isChild,
            message: "Kids must be less than 18 years old.",
          },
        },
      },
    ],
    image: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "userId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.userId = counter.seq;

    // Only assign kidId if kids array is not empty
    if (this.kids && this.kids.length > 0) {
      for (let kid of this.kids) {
        if (!kid.kidId) {
          // Only assign a new kidId if it doesn't already have one
          const kidCounter = await Counter.findByIdAndUpdate(
            { _id: "kidId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
          );
          kid.kidId = kidCounter.seq;
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.index({
  firstName: "text",
  lastName: "text",
  "kids.firstName": "text",
  "kids.lastName": "text",
});

// Add a compound index for kidId and userId
UserSchema.index({ userId: 1, "kids.kidId": 1 }, { unique: true });

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
