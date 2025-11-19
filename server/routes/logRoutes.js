const express = require('express');
const userAuth = require('../middlewares/auth');
const { getLogs } = require('../controllers/logController');
const logRouter = express.Router();

// Get all Logs
logRouter.get('/', userAuth, getLogs);

module.exports = logRouter;