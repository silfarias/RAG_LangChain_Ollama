import { executePythonScript } from "../services/python.service.js";

export const askQuestion = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: 'La pregunta es requerida.' });
        }
        const answer = await executePythonScript(question);
        res.json({ answer });
    } catch (error) {
        console.error('Error al procesar la pregunta:', error);
        res.status(500).json({ error: 'Error al procesar la pregunta.' });
    }
};