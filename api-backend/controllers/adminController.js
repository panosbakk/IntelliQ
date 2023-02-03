const mongoose = require('mongoose');
const config = require('config')
const Answers = require('../models/Answers');
const db = config.get('db')

exports.healthCheck = (req, res) => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        res.send({status:"OK"})
    }).catch(err => {
        console.log('Could not connect to the database.', err);
        process.exit();
    });
}

async function resetall(req, res){
    try {
        await Answers.deleteMany({});
        res.json({ message: "Answers collection has been successfully cleared." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.resetall = resetall