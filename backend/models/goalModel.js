const mongoose = require("mongoose");

// Schema: "what will the data in this collection look like?"
//data strucure
const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
