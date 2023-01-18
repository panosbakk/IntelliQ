const Answers = require("../models/Answers");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.postQuestionAnswer = async (req, res) => {
  try {
    const questionnaireID = req.body.questionnaireID;
    const questionID = req.body.questionID;
    const session = req.body.session;
    const optionID = req.body.optionID;
    const answer = new Answers({
      questionnaireID: questionnaireID,
      session: session,
      answers: { qID: questionID, ans: optionID },
    });
    answer.save((err, doc) => {
      if (!err) {
        req.flash("Answer inserted successfully!");
        res.send(undefined);
        res.redirect("/");
      } else console.log("Error during record insertion : " + err);
    });
  } catch (error) {
    badRequest(res, error);
  }
};
