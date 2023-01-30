const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const internalServerError = require("../utils/internalServerErrorResponse");
const noData = require("../utils/noDataResponse");

exports.getQuestionnairebyid = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const format = req.query.format || "json";
    if (!questionnaireID) {
      return badRequest(
        res,
        "Invalid request. QuestionnaireID is a required parameter."
      );
    }
    const questionnaire = await Questionnaire.findOne({
      questionnaireID: questionnaireID,
    })
      .select("-__v -_id -questions._id -questions.options._id")
      .lean()
      .then((questionnaire) => {
        questionnaire.questions.sort((a, b) => a.qID.localeCompare(b.qID));
        return questionnaire;
      });

    if (questionnaire === null) return noData(res);
    if (format !== "csv" && format !== "json") {
      return badRequest(
        res,
        "Invalid format. format should be either csv or json"
      );
    }
    if (format === "csv") {
      const json2csv = require("json2csv").parse;
      const fields = Object.keys(questionnaire);
      const csv = json2csv(questionnaire, { fields });
      res.set("Content-Type", "text/csv");
      res.set("Content-Disposition", "attachment; filename=questionnaire.csv");
      success(res, csv);
    } else {
      success(res, questionnaire, "Questionnaire");
    }
  } catch (error) {
    internalServerError(res, error);
  }
};
