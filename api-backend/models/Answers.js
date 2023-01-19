const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionnaireID: {
    type: String,
    required: true,
  },

  session: {
    type: String,
    required: true,
    unique: true,
  },

  answers: [
    {
      qID: {
        type: String,
        required: true,
        unique: true,
      },

      ans: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Answers", AnswerSchema);
