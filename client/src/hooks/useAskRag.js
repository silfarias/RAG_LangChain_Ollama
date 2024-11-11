import { useState } from 'react';

export const useAskRag = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const askQuestion = async (question) => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error('Error al procesar la pregunta');
            }

            const data = await response.json();
            setResponse(data.response);
            console.log(data.response);
            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return { askQuestion, response, setResponse, loading };
};