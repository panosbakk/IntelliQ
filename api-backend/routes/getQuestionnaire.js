module.exports = (app) => {
    const {getQuestionnairebyid} = require("../controllers/getQuestionnaire.js");
    app.get('/intelliq_api/questionnaire/:questionnaireID', getQuestionnairebyid);
}