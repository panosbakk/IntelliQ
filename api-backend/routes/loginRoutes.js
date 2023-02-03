module.exports = (app) => {
  const {login} = require('../controllers/loginController')

  app.post('/intelliq_api/login', login);
}