const Answers = require("../models/Answers");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

async function getAnswers(questionnaireID, session) {
  try {
    const answers = await Answers.find({
      questionnaireID: questionnaireID,
      session: session,
    })
      .select("questionnaireID session answers.qID answers.ans")
      .lean();

    const result = {
      questionnaireID: answers[0].questionnaireID,
      session: answers[0].session,
      answers: answers
        .map((a) => a.answers)
        .reduce((acc, val) => acc.concat(val), [])
        .sort((a, b) => a.qID.localeCompare(b.qID))
        .map((a) => ({ qID: a.qID, ans: a.ans })),
    };

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

exports.getSessionAnswers = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const session = req.params.session;
    const format = req.query.format || "json";
    const answers = await getAnswers(questionnaireID, session);
    if (answers === null) return notFound(res);
    if (format !== "csv" && format !== "json") {
      return res
        .status(400)
        .json({ error: "Invalid format. format should be either csv or json" });
    }
    if (format === "csv") {
      const json2csv = require("json2csv").parse;
      const fields = Object.keys(answers);
      const csv = json2csv(answers, { fields });
      res.set("Content-Type", "text/csv");
      res.set(
        "Content-Disposition",
        "attachment; filename=session-answers.csv"
      );
      res.status(200).send(csv);
    } else {
      success(res, answers, "Answers");
    }
  } catch (error) {
    badRequest(res, error);
  }
};
