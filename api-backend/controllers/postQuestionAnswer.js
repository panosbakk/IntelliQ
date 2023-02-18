const Answers = require("../models/Answers");
const Questionnaire = require("../models/Questionnaire");
const badRequest = require("../utils/badRequestResponse");
const internalServerError = require("../utils/internalServerErrorResponse");

exports.postQuestionAnswer = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const session = req.params.session;
    const optionID = req.params.optionID;

    if (!questionnaireID || !questionID || !session || !optionID) {
      return badRequest(
        res,
        "Invalid request. QuestionnaireID, QuestionID, Session and OptionID are all required parameters."
      );
    }

    // Check if questionnaireID, questionID and optionID exist in the Questionnaire collection
    const questionnaire = await Questionnaire.findOne({
      questionnaireID: questionnaireID,
      "questions.qID": questionID,
    });

    if (!questionnaire) {
      return badRequest(
        res,
        "Invalid request. QuestionnaireID, QuestionID, or OptionID do not exist in the database."
      );
    }

    // Find or create an answer document for the given questionnaireID and session
    let answer = await Answers.findOneAndUpdate(
      { questionnaireID: questionnaireID, session: session },
      { questionnaireID: questionnaireID, session: session },
      { upsert: true, new: true, returnOriginal: false }
    );

    // Create a deep copy of the answer document
    const updatedAnswers = JSON.parse(JSON.stringify(answer.toObject().answers));
    updatedAnswers.forEach((ans) => {
      if (ans.qID === questionID) {
        ans.ans = optionID;
      }
    });

    const answerIndex = updatedAnswers.findIndex(
      (ans) => ans.qID === questionID && ans.ans === optionID
    );
    if (answerIndex >= 0) {
      // The answer already exists, no updates needed
      res.sendStatus(200);
    } else {
      if (questionID) {
        // Add a new answer only if questionID is truthy
        updatedAnswers.push({ qID: questionID, ans: optionID });
      }

      // Create a deep copy of the answer document
      const updatedAnswer = JSON.parse(JSON.stringify(answer.toObject()));
      updatedAnswer.answers = updatedAnswers;

      // Update the answer document with the updated answers
      await Answers.findOneAndUpdate(
        { questionnaireID: questionnaireID, session: session },
        updatedAnswer,
        { returnOriginal: false }
      );
      res.sendStatus(200);
    }
  } catch (error) {
    return badRequest(res, error);
  }
};
