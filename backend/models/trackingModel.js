const mongoose = require("mongoose");

const trackingSchema = mongoose.Schema(
  {
    // Foodname: {
    //   type: String,
    //   //   type: mongoose.Schema.Types.name,
    //   //   ref: "users",
    //   required: true,
    // },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    foodID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foods",
      required: true,
    },
    dateSchema: {
      type: String,
      default: function () {
        return new Date().toISOString().slice(0, 10); // Extract YYYY-MM-DD
      },
    },

    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const trackingModel = mongoose.model("trackings", trackingSchema);

module.exports = trackingModel;
