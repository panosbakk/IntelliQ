const mongoose = require('mongoose');
const config = require('config')
const Answers = require('../models/Answers');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Questionnaire = require('../models/Questionnaire');
const db = config.get('db')

exports.healthCheck = (req, res) => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    res.send({ status: "OK", dbconnection: db })
  }).catch(err => {
    res.send({status: "failed", dbconnection: db})
    process.exit();
  });
}

exports.uploadQuestionnaire = (req, res) => {
  try {
    const questionnaireData = JSON.parse(req.file.buffer.toString());
    const { questionnaireID, questionnaireTitle, keywords, questions } = questionnaireData;
    if (!questionnaireID || !questionnaireTitle || !keywords || !questions) {
      return res.status(400).send({ message: "Invalid questionnaire format." });
    }
    for (let i = 0; i < questions.length; i++) {
      const { qID, qtext, required, type, options } = questions[i];
      if (!qID || !qtext || !required || !type || !options) {
        return res.status(400).send({ message: "Invalid questionnaire format." });
      }
      for (let j = 0; j < options.length; j++) {
        const { optID, opttxt, nextqID } = options[j];
        if (!optID || !opttxt || !nextqID) {
          return res.status(400).send({ message: "Invalid questionnaire format." });
        }
      }
    }
    const questionnaire = new Questionnaire(questionnaireData);
    questionnaire.save();
    res.status(200).send({ message: "Questionnaire uploaded successfully." });
  } catch (error) {
    res.status(400).send({ message: "Error uploading questionnaire." });
  }
};



exports.resetQuestionnaire = async (req, res) => {
  const questionnaireID = req.params.questionnaireID;

  Answers.collection.dropIndexes();
  try {
    const result = await Answers.deleteMany({ questionnaireID: questionnaireID });
    if (result.deletedCount > 0) {
      res.json({ status: "OK" });
    } else {
      res.json({ status: "failed", reason: `No answers found for questionnaireID ${ questionnaireID }` });
  }
  } catch (error) {
  res.json({ status: "failed", reason: error.message });
}
  };
async function resetall(req, res) {
  try {
    Questionnaire.collection.dropIndexes();
    Answers.collection.dropIndexes();
    await Questionnaire.deleteMany({});
    await Answers.deleteMany({});
    res.json({ message: "Answers collection has been successfully cleared." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.resetall = resetall