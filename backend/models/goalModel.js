const mongoose = require("mongoose");

// Schema: "what will the data in this collection look like?"
//data strucure
const goalSchema = mongoose.Schema(
  {
    //the user part allows us to have a goal associaated w a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
