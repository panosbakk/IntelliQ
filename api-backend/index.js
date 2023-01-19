const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('custom-env').env('localhost');

const port = process.env.PORT || 7000;
const username = process.env.MONGO_USERNAME;
const pwd = process.env.MONGO_PASS;
const app = express();
app.use(express.json());
//app.use(cors());

mongoose.connect(`mongodb+srv://${username}:${pwd}@intelliq.25mg5s4.mongodb.net/?retryWrites=true&w=majority`);

app.get('/', (req, res) => {
    res.send({ status: 'API Working!'});
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})