module.exports = (app) => {
  const { getSessionAnswers } = require("../controllers/getSessionAnswers.js");
  app.get(
    "/intelliq_api/getsessionanswers/:questionnaireID/:session",
    getSessionAnswers
  );
};
