const mongoose = require("mongoose");

const QuestionnaireSchema = new mongoose.Schema({
  questionnaireID: {
    type: String,
    required: true,
    unique: true,
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
        unique: true,
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

const Questionnaire = mongoose.model("Questionnaire", QuestionnaireSchema);

module.exports = Questionnaire;
