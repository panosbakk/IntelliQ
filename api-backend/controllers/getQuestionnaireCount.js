const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.getQuestionnaireCount = async (req, res) => {
  try {
    const count = await Questionnaire.count();
    success(res, count, "count");
  } catch (error) {
    badRequest(res, error);
  }
};
