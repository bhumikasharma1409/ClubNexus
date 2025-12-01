const { GoogleGenerativeAI } = require("@google/generative-ai");
const { buildSystemContext } = require('../utils/contextBuilder');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

exports.handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        // 1. Build dynamic context from DB
        const systemContext = await buildSystemContext();

        // 2. Construct prompt
        const prompt = `${systemContext}\n\nUser Question: ${message}\nAnswer:`;

        // 3. Generate response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (err) {
        console.error("Chat Error:", err);
        res.status(500).json({
            reply: "I'm having trouble connecting to my brain right now. Please try again later!"
        });
    }
};
