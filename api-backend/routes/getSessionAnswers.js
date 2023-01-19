const express = require("express");
const router = express.Router();

const getSessionAnswers = require("../controllers/getSessionAnswers");

router.get("/:questionnaireID/:session", getSessionAnswers.getSessionAnswers);

module.exports = router;
