module.exports = (app) => {
    const { healthCheck, resetall, resetQuestionnaire, uploadQuestionnaire } = require('../controllers/adminController')
    const { auth } = require('../middleware/auth');
    const { admin } = require('../middleware/admin');
    const multer = require('multer');
    const upload = require("multer")({ storage: multer.memoryStorage() });

    app.post('/intelliq_api/admin/resetall', [auth, admin], resetall)
    app.get('/intelliq_api/admin/healthcheck', [auth, admin], healthCheck);
    app.post('/intelliq_api/admin/questionnaire_upd', [auth, admin, upload.single('file')], uploadQuestionnaire);
    app.post('/intelliq_api/admin/resetq/:questionnaireID', [auth, admin], resetQuestionnaire);
}