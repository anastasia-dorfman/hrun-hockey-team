import mongoose from "mongoose";
import Counter from "./counter.js";

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      unique: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: [
      {
        // product: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "Product",
        //   required: function () {
        //     return !this.registrations || this.registrations.length === 0;
        //   },
        // },
        productId: {
          type: Number,
          required: function () {
            return !this.registrations || this.registrations.length === 0;
          },
        },
        name: {
          type: String,
          required: function () {
            return !this.registrations || this.registrations.length === 0;
          },
        },
        category: {
          type: String,
          required: function () {
            return !this.registrations || this.registrations.length === 0;
          },
        },
        variant: {
          type: {
            color: String,
            size: String,
            price: Number,
          },
          required: function () {
            return !this.registrations || this.registrations.length === 0;
          },
        },
        quantity: {
          type: Number,
          required: function () {
            return !this.registrations || this.registrations.length === 0;
          },
          min: 1,
        },
      },
    ],
    registrations: [
      {
        // group: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "Group",
        //   required: function () {
        //     return !this.items || this.items.length === 0;
        //   },
        // },
        groupId: {
          type: Number,
          required: function () {
            return !this.items || this.items.length === 0;
          },
        },
        groupName: {
          type: String,
          required: function () {
            return !this.items || this.items.length === 0;
          },
        },
        groupMinAge: {
          type: Number,
          required: function () {
            return !this.items || this.items.length === 0;
          },
        },
        groupMaxAge: {
          type: Number,
          required: function () {
            return !this.items || this.items.length === 0;
          },
        },
        season: {
          type: {
            spotsNumber: Number,
            tuition: Number,
            startDate: Date,
            endDate: Date,
            schedule: [
              {
                weekday: String,
                startTime: String,
                endTime: String,
              },
            ],
          },
          required: function () {
            return !this.items || this.items.length === 0;
          },
        },
        kid: {
          type: {
            kidId: Number,
            firstName: String,
            lastName: String,
          },
          required: function () {
            return !this.items || this.items.length === 0;
          },
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// checks if order contains either products or registrations, not both
OrderSchema.pre("validate", function (next) {
  const hasProducts = this.items && this.items.length > 0;
  const hasRegistrations = this.registrations && this.registrations.length > 0;

  if (hasProducts && hasRegistrations) {
    return next(
      new Error("Order cannot contain both products and registrations.")
    );
  }

  next();
});

OrderSchema.pre("save", async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "orderId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.orderId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Order", OrderSchema);
