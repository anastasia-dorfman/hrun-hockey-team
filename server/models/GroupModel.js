import mongoose from "mongoose";
import Counter from "./counter.js";
import { WEEKDAYS } from "../utils/constants.js";

const GroupSchema = new mongoose.Schema(
  {
    groupId: {
      type: Number,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    minAge: {
      type: Number,
      required: true,
      min: 0,
    },
    maxAge: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 350,
    },
    descriptionLong: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      required: true,
    },
    seasons: [
      {
        spotsNumber: {
          type: Number,
          required: true,
          min: 1,
        },
        spotsTaken: {
          type: Number,
          required: true,
          min: 0,
        },
        tuition: {
          type: Number,
          required: true,
          min: 0.01,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        schedule: [
          {
            weekday: {
              type: String,
              enum: Object.values(WEEKDAYS),
              required: true,
            },
            startTime: {
              type: String,
              required: true,
            },
            endTime: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

GroupSchema.pre("save", function (next) {
  const group = this;

  const seasonDates = group.seasons.map((season) => ({
    startDate: season.startDate,
    endDate: season.endDate,
  }));

  // Checks overlapping seasons
  for (let i = 0; i < seasonDates.length; i++) {
    for (let j = i + 1; j < seasonDates.length; j++) {
      const season1 = seasonDates[i];
      const season2 = seasonDates[j];

      if (
        (season1.startDate < season2.endDate &&
          season1.endDate > season2.startDate) ||
        (season2.startDate < season1.endDate &&
          season2.endDate > season1.startDate)
      ) {
        return next(new Error("Season periods cannot overlap."));
      }
    }
  }

  next();
});

GroupSchema.pre("save", async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "groupId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.groupId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

GroupSchema.path("seasons.schedule").validate(function (schedule) {
  return schedule.length > 0;
}, "At least one day in schedule is required");

export default mongoose.model("Group", GroupSchema);
