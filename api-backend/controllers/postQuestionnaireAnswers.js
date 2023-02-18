const Answers = require("../models/Answers");
const Questionnaire = require("../models/Questionnaire");
const badRequest = require("../utils/badRequestResponse");

exports.postQuestionnaireAnswers = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const session = req.params.session;

    if (!questionnaireID || !session) {
      return badRequest(
        res,
        "Invalid request. QuestionnaireID and Session are required parameters."
      );
    }
    // Check if questionnaireID, questionID and optionID exist in the Questionnaire collection
    const questionnaire = await Questionnaire.findOne({
      questionnaireID: questionnaireID,
    });

    if (!questionnaire) {
      return badRequest(
        res,
        "Invalid request. QuestionnaireID does not exist in the database."
      );
    }

    const payload = req.body;
    console.log(req.body);
    const answers = payload.answers;
    const mongoAnswers = Object.keys(answers).map((answerKey) => ({
      qID: answerKey,
      ans: answers[answerKey],
    }));
    await Answers.create({
      questionnaireID: questionnaireID,
      session: session,
      answers: mongoAnswers,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return badRequest(res, error);
  }
};
