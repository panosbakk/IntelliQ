const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.getQuestionnairebyid = async (req, res) => {
  try {
    const questID = req.params.questionnaireID;
    const questionnaire = await Questionnaire.findOne({
      questionnaireID: questID,
    });
    if (questionnaire === null) return notFound(res);
    success(res, questionnaire, "Questionnaire");
  } catch (error) {
    badRequest(res, error);
  }
};
