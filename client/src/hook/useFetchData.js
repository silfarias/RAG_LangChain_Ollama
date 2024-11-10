// src/hooks/useFetchData.js
import { useState, useEffect } from 'react';
import { environments } from '../config/environment';

const useFetchData = (message) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!message) return;  // No realiza el fetch si el mensaje es vacío

        const fetchData = async () => {
            try {
                const response = await fetch(`${environments.API_URL}/api/ask`, {
                    method: 'POST',  // Cambiar a 'POST' si es necesario
                    headers: {
                        'Content-Type': 'application/json', // Especificamos que el cuerpo es JSON
                    },
                    body: JSON.stringify({ message: "Tu mensaje aquí" }) // Envía los datos correctamente
                });
        
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        

        fetchData();
    }, [message]);

    return { data, loading, error };
};

export default useFetchData;
