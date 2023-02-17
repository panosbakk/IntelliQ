module.exports = (app) => {
  const { postQuestionAnswer } = require("../controllers/postQuestionAnswer");
  app.post(
    "/intelliq_api/doanswer/:questionnaireID/:questionID/:session/:optionID",
    postQuestionAnswer
  );
};
