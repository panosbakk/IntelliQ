const express = require('express');
const router = express.Router();

const loginRoute = require('../controllers/loginController');

router.post("/login", loginRoute.login);

module.exports = router;