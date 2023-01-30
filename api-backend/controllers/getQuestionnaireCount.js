const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const internalServerError = require("../utils/internalServerErrorResponse");
const noData = require("../utils/noDataResponse");

exports.getQuestionnaireCount = async (req, res) => {
  try {
    const count = await Questionnaire.count();
    if (count === 0) return noData(res, "No questionnaires found");
    success(res, count, "count");
  } catch (error) {
    internalServerError(res, error);
  }
};
