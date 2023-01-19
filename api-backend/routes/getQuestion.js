const express = require("express");
const router = express.Router();

const getQuestionByID = require("../controllers/getQuestion");

router.get("/:questionnaireID/:questionID", getQuestionByID.getQuestionByID);

module.exports = router;
