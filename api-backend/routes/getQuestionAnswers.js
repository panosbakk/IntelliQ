module.exports = (app) => {
  const {
    getQuestionAnswers,
  } = require("../controllers/getQuestionAnswers.js");

  app.get(
    "/intelliq_api/getquestionanswers/:questionnaireID/:questionID",
    getQuestionAnswers
  );
};
