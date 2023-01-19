const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
require("custom-env").env("localhost");
const getQuestionnaireRoute = require("./routes/getQuestionnaire");
const getQuestionRoute = require("./routes/getQuestion");
const getSessionAnswers = require("./routes/getSessionAnswers");
const getQuestionAnswers = require("./routes/getQuestionAnswers");
const postQuestionAnswer = require("./routes/postQuestionAnswer");

const port = process.env.PORT || 9103;
const username = process.env.MONGO_USERNAME;
const pwd = process.env.MONGO_PASS;
const app = express();
app.use(express.json());
//app.use(cors());
mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://${username}:${pwd}@intelliq.25mg5s4.mongodb.net/?retryWrites=true&w=majority`
);

app.get("/intelliq_api", (req, res) => {
  res.send({ status: "API Working!" });
});

app.use("/intelliq_api/questionnaire", getQuestionnaireRoute);

app.use("/intelliq_api/question", getQuestionRoute);

app.use("/intelliq_api/getsessionanswers", getSessionAnswers);

app.use("/intelliq_api/getquestionanswers", getQuestionAnswers);

app.use("/intelliq_api/doanswer", postQuestionAnswer);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
