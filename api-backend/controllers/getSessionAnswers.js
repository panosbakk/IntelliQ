const Answers = require("../models/Answers");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.getSessionAnswers = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const session = req.params.session;
    const answers = await Answers.find({
      questionnaireID: questionnaireID,
      session: session,
    }).select("-__v -_id -answers._id -answers.__v");
    if (answers === null) return notFound(res);
    success(res, answers, "Answers");
  } catch (error) {
    badRequest(res, error);
  }
};
