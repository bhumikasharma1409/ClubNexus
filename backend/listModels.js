const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // There isn't a direct listModels method on the client instance in some versions, 
        // but let's try to just use a known valid model or debug.
        // Actually, the error message suggested calling ListModels, but that might be a REST API hint.
        // Let's try a simple generation with 'gemini-1.5-flash' again but print more info if it fails.

        // Alternatively, let's try 'gemini-pro' again but maybe the library version is old?
        // I installed the latest.

        // Let's try to use the REST API directly to list models.
        const key = process.env.GEMINI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

listModels();
