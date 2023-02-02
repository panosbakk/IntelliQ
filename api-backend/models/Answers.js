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

const Answers = mongoose.model("Answers", AnswerSchema);

module.exports = Answers;
