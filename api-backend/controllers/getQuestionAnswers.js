const Answers = require("../models/Answers");
const success = require("../utils/successResponse");
const badRequest = require("../utils/badRequestResponse");
const notFound = require("../utils/notFoundResponse");

function getAnswers(questionnaireID, questionID) {
  return Answers.find({ questionnaireID: questionnaireID, 'answers.qID': questionID }, {'session': 1, 'answers.$': 1})
      .sort({'answers.date': 1}).exec();
}



exports.getQuestionAnswers = async (req, res) => {
  const questionnaireID = req.params.questionnaireID
  const questionID = req.params.questionID
  getAnswers(questionnaireID, questionID)
  .then((answers)=>{
    res.json({ answers: answers })
  })
  .catch((err)=>{
    res.json({error:err})
  });
}

