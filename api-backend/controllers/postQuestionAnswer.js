const Questionnaire = require("../models/Answers");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.postQuestionAnswer = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const session = req.params.session;
    const optionID = req.params.optionID;
    const answer = new Answers({
      questionnaireID: questionnaireID,
      session: session,
      "answers.qID": questionID,
      "answers.ans": optionID,
    });
    if (answer === null) return notFound(res);
    success(res, answer, "Answer given");
  } catch (error) {
    badRequest(res, error);
  }
};
