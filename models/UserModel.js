import mongoose from "mongoose";
import Counter from "./counter.js";
import { isAdult, isChild, parseAndValidateDate } from "../utils/dateUtils.js";
import {
  ERROR_MESSAGES,
  LANGUAGE_OPTIONS,
  languageOptions,
  SCHEMA_CONSTRAINTS,
  USER_ROLES,
  USER_STATUSES,
  userRoleOptions,
  userStatusOptions,
  VALIDATION_PATTERNS,
} from "../utils/constants.js";

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
      minlength: SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH,
      maxlength: SCHEMA_CONSTRAINTS.NAME.MAX_LENGTH,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      index: true,
      minlength: SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH,
      maxlength: SCHEMA_CONSTRAINTS.NAME.MAX_LENGTH,
    },
    dob: {
      type: Date,
      required: false,
      set: (value) => {
        if (value) return parseAndValidateDate(value);
        return value;
      },
      validate: {
        validator: (value) => {
          if (value) return isAdult(value);
          return true;
        },
        message: ERROR_MESSAGES.ADULT_AGE_REQUIRED,
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return VALIDATION_PATTERNS.PHONE.test(v);
        },
        message: (props) => ERROR_MESSAGES.INVALID_PHONE_FORMAT,
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
        message: (props) => ERROR_MESSAGES.INVALID_EMAIL_FORMAT,
      },
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      country: String,
      province: String,
      city: {
        type: String,
        trim: true,
        minlength: SCHEMA_CONSTRAINTS.CITY.MIN_LENGTH,
      },
      postalCode: {
        type: String,
        validate: {
          validator: function (v) {
            return v === "" || VALIDATION_PATTERNS.POSTAL_CODE.test(v);
          },
          message: (props) => ERROR_MESSAGES.INVALID_POSTAL_CODE,
        },
      },
      streetAddress: {
        type: String,
        trim: true,
        minlength: SCHEMA_CONSTRAINTS.STREET_ADDRESS.MIN_LENGTH,
      },
      apt: String,
    },
    kids: [
      {
        kidId: {
          type: Number,
          // required: true,
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
            message: ERROR_MESSAGES.CHILD_AGE_REQUIRED,
          },
        },
      },
    ],
    image: String,
    role: {
      type: String,
      enum: userRoleOptions,
      default: USER_ROLES.USER,
    },
    status: {
      type: String,
      enum: userStatusOptions,
      default: USER_STATUSES.ACTIVE,
    },
    language: {
      type: String,
      enum: languageOptions,
      default: LANGUAGE_OPTIONS.ENGLISH,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isNew && !this.isModified("kids")) {
    next();
    return;
  }

  try {
    if (this.isNew) {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.userId = counter.seq;
    }

    if (this.kids && this.kids.length > 0) {
      for (let kid of this.kids) {
        if (!kid.kidId) {
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
