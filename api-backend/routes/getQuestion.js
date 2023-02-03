module.exports = (app) => {
    const { getQuestionByID } = require('../controllers/getQuestion.js');

    app.get('/intelliq_api/question/:questionnaireID/:questionID', getQuestionByID);
}

