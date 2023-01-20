const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.getQuestionnairebyid = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionnaire = await Questionnaire.findOne({
      questionnaireID: questionnaireID,
    }).select("-__v -_id -questions._id -questions.options._id");
    if (questionnaire === null) return notFound(res);
    success(res, questionnaire, "Questionnaire");
  } catch (error) {
    badRequest(res, error);
  }
};
