const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('custom-env').env('localhost');
const getQuestionnaireRoute = require('./routes/getQuestionnaire');

const port = process.env.PORT || 9103;
const username = process.env.MONGO_USERNAME;
const pwd = process.env.MONGO_PASS;
const app = express();
app.use(express.json());
//app.use(cors());
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${username}:${pwd}@intelliq.25mg5s4.mongodb.net/?retryWrites=true&w=majority`);



app.get('/intelliq_api', (req, res) => {
    res.send({ status: 'API Working!'});
})

app.use('/intelliq_api/questionnaire', getQuestionnaireRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
