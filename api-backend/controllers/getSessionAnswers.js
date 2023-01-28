const Answers = require("../models/Answers");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.getSessionAnswers = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const session = req.params.session;
    const format = req.query.format || "json";
    const answers = await Answers.find({
      questionnaireID: questionnaireID,
      session: session,
    }).select("-__v -_id -answers._id -answers.__v");
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
