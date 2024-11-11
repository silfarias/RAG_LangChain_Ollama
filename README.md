# Trabajo Práctico Final: Sistema de Recuperación de Información Asistida por Generación (RAG) con LangChain y Ollama

## Descripción

Este proyecto implementa un sistema de Recuperación de Información Asistida por Generación (RAG) utilizando LangChain y el modelo Llama3 de Ollama. El sistema permite responder a preguntas de manera precisa, combinando una búsqueda eficiente en una base de datos de vectores con un modelo de lenguaje natural que genera respuestas en lenguaje natural basadas en la información recuperada. Este enfoque resulta especialmente útil para consultas complejas que requieren combinar múltiples fragmentos de información.

## Estructura del Proyecto

La estructura de carpetas del proyecto es la siguiente:

- **`/client`**: Contiene la interfaz de usuario, desarrollada en React, que permite a los usuarios realizar consultas al sistema de manera sencilla.
- **`/server`**: Implementado en Python con FastAPI, este directorio contiene toda la lógica del backend, incluyendo la gestión de rutas, el servicio de búsqueda de embeddings, y la generación de respuestas.

## Funcionalidad del Sistema

El sistema sigue un flujo de operación en varios pasos:

1. **Interfaz de Usuario (Frontend)**: El usuario introduce una pregunta o consulta en la interfaz gráfica.

2. **Llamada al Backend (FastAPI)**: La consulta se envía al servidor, que utiliza FastAPI para gestionar las solicitudes HTTP de manera eficiente.

3. **Procesamiento de Embeddings**: El backend transforma la consulta en un vector numérico (embedding) que representa la pregunta en un espacio de alta dimensionalidad.

4. **Búsqueda en Base de Datos Vectorial (Chroma)**: La consulta en formato embedding se utiliza para buscar en Chroma, una base de datos vectorial que almacena los embeddings de documentos. Los fragmentos de texto más relevantes (chunks) se recuperan según su similitud con la consulta.

5. **Generación de Respuesta (LLM)**: Los fragmentos recuperados se envían a Llama3, un modelo de lenguaje natural, que utiliza estos fragmentos para generar una respuesta coherente y detallada en lenguaje natural.

6. **Entrega de Respuesta**: La respuesta generada se envía de vuelta al frontend, donde el usuario puede visualizar la respuesta en la interfaz.


## Componentes Principales

- **Frontend**: Proporciona una interfaz intuitiva para que el usuario interactúe con el sistema, donde puede ingresar preguntas y recibir respuestas.

- **Backend (FastAPI y Python)**: 
    * Endpoint **api/ask**: Recibe las consultas del usuario y las envía al servicio de embeddings. 
    * Servicio **rag_service.py**: Contiene la lógica de transformación de texto en embeddings y la gestión de consultas en la base de datos vectorial.

- **Base de Datos Vectorial (Chroma)**:  Almacena los embeddings de documentos previamente procesados, permitiendo una búsqueda eficiente basada en similitud para encontrar los fragmentos relevantes.

- **Modelo de Lenguaje (LLM - Llama3 de Ollama)**: Genera respuestas basadas en los fragmentos de texto recuperados, sintetizando información y proporcionando respuestas en lenguaje natural.

## Tecnologías y Herramientas

1. **FastAPI**: Framework web rápido y de alto rendimiento, ideal para construir APIs en Python.
2. **Python 3.x**: Lenguaje de programación principal del backend.
3. **Chroma**: Base de datos vectorial para almacenar y buscar embeddings, fundamental para la búsqueda de documentos relevantes.
4. **Ollama Llama3**: Modelo de lenguaje natural avanzado utilizado para generar respuestas a partir de la información recuperada.
5. **LangChain**: Biblioteca que facilita la integración y manejo de varios componentes del sistema, como la gestión de embeddings y la conexión con el modelo de lenguaje.

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/silfarias/RAG_LangChain_Ollama.git
```

2. Dirigirse al directorio `server`:
```bash
cd server
```

3. Instalar las dependencias requeridas para el servidor: 
```bash
pip install -r requirements.txt
```

4. **Carga de Documento en /data**: Asegúrarse de cargar el documento PDF necesario en la carpeta data, el cual se utilizará para generar los embeddings de la base de datos vectorial.

5. Iniciar el backend con FastAPI:
```bash
uvicorn app.main:app --reload
```

6. Abrir una nueva terminal y dirigirse al directorio client:
```bash
cd client
```

7. Instala las dependencias necesarias para el frontend:
```bash
npm install
```

8. Iniciar el proyecto:
```bash
npm start
```
### Acceso a la Interfaz
Una vez que ambos servidores (frontend y backend) estén en funcionamiento, puedes acceder a la interfaz del sistema en tu navegador en http://localhost:5173 para interactuar con el sistema RAG.