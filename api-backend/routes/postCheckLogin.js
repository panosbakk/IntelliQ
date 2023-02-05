module.exports = (app) => {
  const { postCheckLogin } = require("../controllers/postCheckLogin");
  app.post("/intelliq_api/check-login", postCheckLogin);
};
