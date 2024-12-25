const express = require('express');
const router = express.Router();
const { getChatbotResponse } = require('../chatbot/chatbotService');

router.post('/chat', getChatbotResponse);

module.exports = router;