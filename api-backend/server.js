const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("custom-env").env("localhost");
const getQuestionnaireRoute = require("./routes/getQuestionnaire");
const getQuestionnaireCountRoute = require("./routes/getQuestionnaireCount");
const getQuestionRoute = require("./routes/getQuestion");
const getSessionAnswersRoute = require("./routes/getSessionAnswers");
const getQuestionAnswersRoute = require("./routes/getQuestionAnswers");
const postQuestionAnswerRoute = require("./routes/postQuestionAnswer");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const {
  getQuestionnaireCount,
} = require("./controllers/getQuestionnaireCount");

const port = process.env.PORT || 9103;
const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);



app.use("/intelliq_api/questionnaire", getQuestionnaireRoute);

app.use("/intelliq_api/questionnaireCount", getQuestionnaireCountRoute);

app.use("/intelliq_api/question", getQuestionRoute);

app.use("/intelliq_api/getsessionanswers", getSessionAnswersRoute);

app.use("/intelliq_api/getquestionanswers", getQuestionAnswersRoute);

app.use("/intelliq_api/doanswer", postQuestionAnswerRoute);

app.use("/intelliq_api", registerRoutes);

app.use("/intelliq_api", loginRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
