const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create express app
const app = express();

// enable cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

require("./routes/getQuestion.js")(app);
require("./routes/getQuestionAnswers.js")(app);
require("./routes/getQuestionnaire.js")(app);
require("./routes/getQuestionnaireCount.js")(app);
require("./routes/getSessionAnswers.js")(app);
require("./routes/postQuestionAnswer.js")(app);
require("./routes/adminRoutes.js")(app);
require("./routes/loginRoutes.js")(app);
require("./routes/logoutRoutes.js")(app);
require("./routes/postCheckLogin.js")(app);

module.exports = app;
