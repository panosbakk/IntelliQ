const Answers = require("../models/Answers");
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

    // Find or create an answer document for the given questionnaireID and session
    let answer = await Answers.findOneAndUpdate(
      { questionnaireID: questionnaireID, session: session },
      { questionnaireID: questionnaireID, session: session },
      { upsert: true, new: true }
    );

    // Find the answer in the answers array, and update or add the answer
    const answerIndex = answer.answers.findIndex(
      (ans) => ans.qID === questionID && ans.ans === optionID
    );
    if (answerIndex >= 0) {
      // The answer already exists, no updates needed
      res.sendStatus(204);
    } else {
      // Find the index of the answer in the answers array
      const answerIndex = answer.answers.findIndex(
        (ans) => ans.qID === questionID
      );
      if (answerIndex >= 0) {
        // Update the existing answer
        answer.answers[answerIndex].ans = optionID;
      } else {
        // Add a new answer to the answers array
        answer.answers.push({ qID: questionID, ans: optionID });
      }

      // Save the answer
      await answer.save();
      res.sendStatus(204);
    }
  } catch (error) {
    badRequest(res, error);
  }
};
