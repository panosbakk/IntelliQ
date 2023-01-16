const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.getQuestionByID = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const questionnaire = await Questionnaire.findOne({
      questionnaireID: questionnaireID,
      "questions.qID": questionID,
    });
    if (questionnaire === null) return notFound(res);
    success(res, questionnaire, "Question");
  } catch (error) {
    badRequest(res, error);
  }
};
