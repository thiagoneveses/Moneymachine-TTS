import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyARzNw_Kh8PGb9c7lCJ2ueGeeMx6XkAB28');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { content, fileName, sourceLanguage, sourceVoice, translations } = req.body;

        const result = await model.generateContent({
            contents: [{ text: content }]
        });

        res.status(200).json({ success: true, data: result });

    } catch (error) {
        console.error('Error processing:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}