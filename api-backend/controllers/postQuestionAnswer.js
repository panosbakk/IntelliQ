const Answers = require("../models/Answers");
const badRequest = require("../utils/badRequestResponse");
const internalServerError = require("../utils/internalServerErrorResponse");

exports.postQuestionAnswer = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const session = req.params.session;
    const optionID = req.params.optionID;
    if (!questionnaireID || !questionID || !session || !optionID) {
      return badRequest(
        res,
        "Invalid request. QuestionnaireID, QuestionID, Session and OptionID are all required parameters."
      );
    }
    const answer = new Answers({
      questionnaireID: questionnaireID,
      session: session,
      answers: { qID: questionID, ans: optionID },
    });
    answer.save((error, doc) => {
      res.send(undefined); // without this line consecutive post requests cap at 9
      if (error) internalServerError(res, error);
    });
  } catch (error) {
    internalServerError(res, error);
  }
};
