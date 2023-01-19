const Answers = require("../models/Answers");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

function getAnswers(questionnaireID, questionID) {
  return Answers.aggregate([
    {$match: { questionnaireID: questionnaireID }},
    {$unwind: "$answers"},
    {$match: { 'answers.qID': questionID }},
    {$group: { _id: { questionnaireID: "$questionnaireID", qID: "$answers.qID" },
     ans: { $push: { session: "$session", ans: "$answers.ans" } }
    }},
    {$project: {_id:0, questionnaireID: "$_id.questionnaireID", questionID: "$_id.qID", answers: "$ans"}},
    {$sort: {'answers.ans.date': 1}},
    {$limit: 1}
  ]).exec();
}


exports.getQuestionAnswers = async (req, res) => {
  const questionnaireID = req.params.questionnaireID
  const questionID = req.params.questionID
  getAnswers(questionnaireID, questionID)
  .then((answers)=>{
    res.json(answers[0])
  })
  .catch((err)=>{
    res.json({error:err})
  });
}

