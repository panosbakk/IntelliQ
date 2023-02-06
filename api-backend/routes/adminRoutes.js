module.exports = (app) => {
    const { healthCheck, resetall, resetQuestionnaire } = require('../controllers/adminController')
    const { auth } = require('../middleware/auth');
    const { admin } = require('../middleware/admin');
    app.post('/intelliq_api/admin/resetall', [auth, admin], resetall)
    app.get('/intelliq_api/admin/healthcheck', [auth, admin], healthCheck);
    app.post('/intelliq_api/admin/resetq/:questionnaireID', [auth, admin], resetQuestionnaire);
}