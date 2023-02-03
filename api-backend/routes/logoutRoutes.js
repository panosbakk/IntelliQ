module.exports = (app) => {
    const {logout} = require('../controllers/logoutController')
    const { auth } = require('../middleware/auth')

    app.post('/intelliq_api/logout', auth, logout);
}