const express = require("express");
const router = express.Router();

const getQuestionAnswers = require("../controllers/getQuestionAnswers");

router.get(
  "/:questionnaireID/:questionID",
  getQuestionAnswers.getQuestionAnswers
);

module.exports = router;
