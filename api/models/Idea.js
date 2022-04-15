const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    categoryId: {
        type: String,
        required: true,
      },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
       default: "idea/Hide yo pain Harold.png",
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Idea", IdeaSchema);
