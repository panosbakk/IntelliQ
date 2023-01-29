const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

async function getQuestionData(questionnaireID, questionID) {
  try {
    const questionnaire = await Questionnaire.findOne({
      questionnaireID: questionnaireID,
      "questions.qID": questionID,
    });

    const { qID, qtext, required, type, options } =
      questionnaire.questions.find((question) => question.qID === questionID);

    return {
      questionnaireID,
      qID,
      qtext,
      required,
      type,
      options: options.map(({ optID, opttxt, nextqID }) => ({
        optID,
        opttxt,
        nextqID,
      })),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

exports.getQuestionByID = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const format = req.query.format || "json";
    const questionnaire = await getQuestionData(questionnaireID, questionID);
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
