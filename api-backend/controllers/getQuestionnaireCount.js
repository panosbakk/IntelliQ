const Questionnaire = require("../models/Questionnaire");
const success = require("../utils/successResponse");
const noData = require("../utils/noDataResponse");
const badRequest = require("../utils/badRequestResponse");

exports.getQuestionnaireCount = async (req, res) => {
  try {
    const count = await Questionnaire.count();
    if (count === 0) return noData(res, "No questionnaires found");

    const questionnaireIds = await Questionnaire.aggregate([
      {
        $group: {
          _id: null,
          questionnaireIds: { $addToSet: "$questionnaireID" },
        },
      },
      { $sort: { questionnaireIds: 1 } },
      { $project: { _id: 0, questionnaireIds: 1 } },
    ]);

    success(res, {
      count,
      questionnaireIds: questionnaireIds[0].questionnaireIds,
    });
  } catch (error) {
    badRequest(res, error);
  }
};
