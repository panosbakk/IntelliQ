module.exports = (app) => {
    const { healthCheck, resetall } = require('../controllers/adminController')
    const { auth } = require('../middleware/auth');
    const { admin } = require('../middleware/admin');
    app.post('/intelliq_api/admin/resetall', [auth, admin], resetall)
    app.get('/intelliq_api/admin/healthcheck', [auth, admin], healthCheck);
}