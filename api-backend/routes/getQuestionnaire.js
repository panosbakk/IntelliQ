const express = require("express");
const router = express.Router();

const getQuestionnairebyid = require("../controllers/getQuestionnaire");

router.get("/:questionnaireID", getQuestionnairebyid.getQuestionnairebyid);

module.exports = router;
