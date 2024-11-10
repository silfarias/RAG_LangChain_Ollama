import { spawn } from "child_process";
import path from 'node:path';

// función para ejecutar el script de Python
export const executePythonScript = (question) => {
    return new Promise((resolve, reject) => {
        // ejecuta el script de Python
        const pythonScriptPath = path.resolve("../python/main.py");
        console.log(pythonScriptPath);
        const pythonProcess = spawn('python', [pythonScriptPath, question]);
        
        let response = '';

        // captura la salida
        pythonProcess.stdout.on('data', (data) => {
            response += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error('Error en Python:', data.toString());
        });

        // detecta cuando el script termina
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(response);
            } else {
                reject('El proceso de Python falló');
            }
        });
    });
}