const express = require("express");
const router = express.Router();

const getQuestionnaireCount = require("../controllers/getQuestionnaireCount");

router.get("/", getQuestionnaireCount.getQuestionnaireCount);

module.exports = router;
