const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.getQuestionByID = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const format = req.query.format || "json";
    const questionnaire = await Questionnaire.findOne(
      { questionnaireID: questionnaireID, "questions.qID": questionID },
      { questionnaireID: 1, "questions.$": 1 }
    );
    if (questionnaire === null) return notFound(res);
    if (format !== "csv" && format !== "json") {
      return res
        .status(400)
        .json({ error: "Invalid format. format should be either csv or json" });
    }
    if (format === "csv") {
      const json2csv = require("json2csv").parse;
      const fields = Object.keys(questionnaire);
      const csv = json2csv(questionnaire, { fields });
      res.set("Content-Type", "text/csv");
      res.set("Content-Disposition", "attachment; filename=question.csv");
      res.status(200).send(csv);
    } else {
      success(res, questionnaire, "Question");
    }
  } catch (error) {
    badRequest(res, error);
  }
};
