const mongoose = require("mongoose");

const QuestionnaireSchema = new mongoose.Schema({
  questionnaireID: {
    type: String,
    required: true,
  },

  questionnaireTitle: {
    type: String,
    required: true,
  },

  keywords: [
    {
      type: String,
      required: true,
    },
  ],

  questions: [
    {
      qID: {
        type: String,
      },

      qtext: {
        type: String,
      },

      required: {
        type: String,
      },

      type: {
        type: String,
        required: true,
      },

      options: [
        {
          optID: {
            type: String,
            required: true,
            unique: true,
          },

          opttxt: {
            type: String,
            required: true,
          },

          nextqID: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Questionnaire", QuestionnaireSchema);
