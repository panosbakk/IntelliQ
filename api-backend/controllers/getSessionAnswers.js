const Answers = require("../models/Answers");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.getSessionAnswers = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const session = req.params.session;
    const answers = await Answers.findOne({
      questionnaireID: questionnaireID,
      session: session,
    });
    if (answers === null) return notFound(res);
    success(res, answers, "Answers");
  } catch (error) {
    badRequest(res, error);
  }
};
