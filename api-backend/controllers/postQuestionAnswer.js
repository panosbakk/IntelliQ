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
    // Check if answer with same questionnaireID and session already exists
    const existingAnswer = await Answers.findOne({
      questionnaireID: questionnaireID,
      session: session,
    });

    if (existingAnswer) {
      // Check if qID and optionID already exist in the answers array
      let answerExists = false;
      existingAnswer.answers.forEach((answer) => {
        if (answer.qID === questionID) {
          answer.ans = optionID;
          answerExists = true;
        }
      });

      // If qID and optionID don't exist, add to answers array
      if (!answerExists) {
        existingAnswer.answers.push({ qID: questionID, ans: optionID });
      }

      // Save the updated answer
      await existingAnswer.save();
      res.sendStatus(204);
    } else {
      // Save new answer
      const answer = new Answers({
        questionnaireID: questionnaireID,
        session: session,
        answers: [{ qID: questionID, ans: optionID }],
      });
      await answer.save();
      res.sendStatus(204);
    }
  } catch (error) {
    badRequest(res, error);
  }
};
