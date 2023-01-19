const express = require("express");
const router = express.Router();

const postQuestionAnswer = require("../controllers/postQuestionAnswer");

router.post(
  "/:questionnaireID/:questionID/:session/:optionID",
  postQuestionAnswer.postQuestionAnswer
);

module.exports = router;
