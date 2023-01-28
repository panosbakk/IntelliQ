const Answers = require("../models/Answers");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

function getAnswers(questionnaireID, questionID) {
  return Answers.aggregate([
    { $match: { questionnaireID: questionnaireID } },
    { $unwind: "$answers" },
    { $match: { "answers.qID": questionID } },
    {
      $group: {
        _id: { questionnaireID: "$questionnaireID", qID: "$answers.qID" },
        ans: { $push: { session: "$session", ans: "$answers.ans" } },
      },
    },
    {
      $project: {
        _id: 0,
        questionnaireID: "$_id.questionnaireID",
        questionID: "$_id.qID",
        answers: "$ans",
      },
    },
    { $sort: { "answers.ans.date": 1 } },
    { $limit: 1 },
  ]).exec();
}

exports.getQuestionAnswers = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const format = req.query.format || "json";
    if (format !== "csv" && format !== "json") {
      return res
        .status(400)
        .json({ error: "Invalid format. format should be either csv or json" });
    }
    const answers = await getAnswers(questionnaireID, questionID);
    if (answers.length === 0) return notFound(res);
    if (format === "csv") {
      const json2csv = require("json2csv").parse;
      const fields = Object.keys(answers[0]);
      const csv = json2csv(answers, { fields });
      res.set("Content-Type", "text/csv");
      res.set(
        "Content-Disposition",
        "attachment; filename=question-answers.csv"
      );
      res.status(200).send(csv);
    } else {
      res.json(answers[0]);
    }
  } catch (error) {
    res.json({ error });
  }
};
