const Questionnaire = require("../models/Questionnaire");
const Answers = require("../models/Answers");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

exports.getQuestionAnswers = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const questionnaire2 = await Questionnaire.aggregate([
      {
        $lookup: {
          from: "Answers",
          localField: "questionnaireID",
          foreignField: "questionnaireID",
          as: "joinedData",
        },
      },
    ]);
    const questionnaire = await questionnaire2
      .findOne(
        {
          questionnaireID: questionnaireID,
          questions: { $elemMatch: { qID: questionID } },
        },
        "questionnaireID questions session"
      )
      .select({ questions: { $elemMatch: { qID: questionID } } });
    if (questionnaire === null) return notFound(res);
    success(res, questionnaire, "Question");
  } catch (error) {
    badRequest(res, error);
  }
};
