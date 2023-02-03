module.exports = (app) => {
    const { healthCheck, resetall } = require('../controllers/adminController')
    

    app.post('/intelliq_api/admin/resetall', resetall)
    app.get('/intelliq_api/admin/healthcheck', healthCheck);
}