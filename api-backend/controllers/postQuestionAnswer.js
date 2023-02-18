const mongoose = require('mongoose');
const Answers = require('../models/Answers');
const Questionnaire = require('../models/Questionnaire');
const badRequest = require('../utils/badRequestResponse');
const internalServerError = require('../utils/internalServerErrorResponse');

exports.postQuestionAnswer = async (req, res) => {
  const session = mongoose.startSession();
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const optionID = req.params.optionID;

    if (!questionnaireID || !questionID || !session || !optionID) {
      return badRequest(
        res,
        'Invalid request. QuestionnaireID, QuestionID, Session and OptionID are all required parameters.'
      );
    }

    const sessionOptions = { readPreference: 'primary', readConcern: { level: 'local' }, writeConcern: { w: 'majority' } };
    const transactionResults = await session.withTransaction(async () => {
      // Check if questionnaireID, questionID and optionID exist in the Questionnaire collection
      const questionnaire = await Questionnaire.findOne({
        questionnaireID: questionnaireID,
        'questions.qID': questionID,
      }).session(session);

      if (!questionnaire) {
        throw new Error(
          'Invalid request. QuestionnaireID, QuestionID, or OptionID do not exist in the database.'
        );
      }

      // Find or create an answer document for the given questionnaireID and session
      let answer = await Answers.findOneAndUpdate(
        { questionnaireID: questionnaireID, session: session },
        { questionnaireID: questionnaireID, session: session },
        { upsert: true, new: true, session: session }
      );

      const answerIndex = answer.answers.findIndex(
        (ans) => ans.qID === questionID && ans.ans === optionID
      );
      if (answerIndex >= 0) {
        // The answer already exists, no updates needed
        return { status: 'OK' };
      } else {
        // Find the index of the answer in the answers array
        const answerIndex = answer.answers.findIndex(
          (ans) => ans.qID === questionID
        );
        if (answerIndex >= 0) {
          // Update the existing answer
          answer.answers[answerIndex].ans = optionID;
        } else if (questionID) {
          // Add a new answer only if questionID is truthy
          // Add a new answer to the answers array
          answer.answers.push({ qID: questionID, ans: optionID });
        }
        // Save the answer
        await answer.save({ session: session });
        return { status: 'OK' };
      }
    }, sessionOptions);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    internalServerError(res, error);
  } finally {
    await session.endSession();
  }
};
