const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const internalServerError = require("../utils/internalServerErrorResponse");
const noData = require("../utils/noDataResponse");

async function getQuestionData(questionnaireID, questionID) {
  try {
    const questionnaire = await Questionnaire.findOne({
      questionnaireID: questionnaireID,
      "questions.qID": questionID,
    });

    const { qID, qtext, required, type, options } =
      questionnaire.questions.find((question) => question.qID === questionID);

    const result = {
      questionnaireID,
      qID,
      qtext,
      required,
      type,
      options: options
        .map(({ optID, opttxt, nextqID }) => ({
          optID,
          opttxt,
          nextqID,
        }))
        .sort((a, b) => a.optID.localeCompare(b.optID)),
    };

    return result;
  } catch (error) {
    return internalServerError(res, error);
  }
}

exports.getQuestionByID = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const format = req.query.format || "json";
    if (!questionnaireID || !questionID) {
      return badRequest(
        res,
        "Invalid request. QuestionnaireID and QuestionID are required parameters."
      );
    }
    const questionnaire = await getQuestionData(questionnaireID, questionID);
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
      res.set("Content-Disposition", "attachment; filename=question.csv");
      success(res, csv);
    } else {
      success(res, questionnaire, "Question");
    }
  } catch (error) {
    badRequest(res, error);
  }
};
