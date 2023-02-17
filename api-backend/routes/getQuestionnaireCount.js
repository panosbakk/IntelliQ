module.exports = (app) => {
  const {
    getQuestionnaireCount,
  } = require("../controllers/getQuestionnaireCount");
  app.get("/intelliq_api/questionnairecount", getQuestionnaireCount);
};
