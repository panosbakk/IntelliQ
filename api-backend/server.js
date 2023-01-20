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
const {
  getQuestionnaireCount,
} = require("./controllers/getQuestionnaireCount");

const port = process.env.PORT || 9103;
const username = process.env.MONGO_USERNAME;
const pwd = process.env.MONGO_PASS;
const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://${username}:${pwd}@intelliq.25mg5s4.mongodb.net/?retryWrites=true&w=majority`
);

app.get("/intelliq_api", (req, res) => {
  res.send({ status: "API Working!" });
});

app.use("/intelliq_api/questionnaire", getQuestionnaireRoute);

app.use("/intelliq_api/questionnaireCount", getQuestionnaireCountRoute);

app.use("/intelliq_api/question", getQuestionRoute);

app.use("/intelliq_api/getsessionanswers", getSessionAnswersRoute);

app.use("/intelliq_api/getquestionanswers", getQuestionAnswersRoute);

app.use("/intelliq_api/doanswer", postQuestionAnswerRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
