const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const noData = require("../utils/noDataResponse");
const badRequest = require("../utils/badRequestResponse");

exports.getQuestionnaireCount = async (req, res) => {
  try {
    const count = await Questionnaire.count();
    if (count === 0) return noData(res, "No questionnaires found");
    success(res, count);
  } catch (error) {
    badRequest(res, error);
  }
};
