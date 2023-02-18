module.exports = (app) => {
  const {
    postQuestionnaireAnswers,
  } = require("../controllers/postQuestionnaireAnswers");
  app.post(
    "/intelliq_api/submitanswers/:questionnaireID/:session",
    postQuestionnaireAnswers
  );
};
