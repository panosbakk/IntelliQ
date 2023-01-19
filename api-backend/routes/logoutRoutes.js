const express = require('express');
const router = express.Router();

const logoutRoute = require('../controllers/logoutController');

router.post("/logout", logoutRoute.logout);

module.exports = router;