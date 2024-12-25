const chatbotAnswers = require('./chatbotAnswers');

const getChatbotResponse = async (req, res) => {
    const { userMessage } = req.body;

    const normalizedMessage = userMessage.trim().toLowerCase();

    const botResponse = chatbotAnswers[normalizedMessage] || "Sorry, I didn't understand that.";

    res.status(200).json({ response: botResponse });
};

module.exports = { getChatbotResponse };