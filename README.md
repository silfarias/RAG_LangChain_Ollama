# Trabajo Práctico Final: Implementación de un Sistema RAG usando LangChain y Ollama

## Descripción

Este proyecto consiste en la implementación de un sistema de Recuperación de Información Asistida por Generación (RAG) utilizando LangChain y el modelo Llama3 de Ollama. El sistema permite responder preguntas de manera eficiente y precisa, recuperando información relevante desde una base de datos de documentos en formato de "embeddings" y generando respuestas con un modelo de lenguaje natural.

## Estructura del Proyecto

La estructura de carpetas del proyecto es la siguiente:

- **`/frontend`**: Contiene la interfaz de usuario, donde los usuarios pueden hacer preguntas al sistema.
- **`/backend`**: Implementado con Node.js y Express, este módulo actúa como intermediario entre el frontend y el motor de procesamiento.
- **`/python`**: Contiene el script `main.py`, encargado de procesar las consultas, realizar la búsqueda en la base de datos vectorial y obtener la respuesta final.

## Funcionalidad del Sistema

El sistema funciona de la siguiente manera:

1. **Interfaz de Usuario (Frontend)**: El usuario ingresa una consulta en la interfaz gráfica.
2. **Llamada al Backend**: La consulta es enviada al servidor, implementado en Node.js con Express.
3. **Procesamiento en Python**: El backend pasa la consulta al script `main.py` en el directorio de Python, donde se convierte en un vector numérico (embedding).
4. **Búsqueda de Embeddings**: La consulta en formato de embedding se utiliza para buscar en la base de datos vectorial Chroma los fragmentos (chunks) de documentos más relevantes.
5. **Generación de Respuesta (LLM)**: Los fragmentos relevantes se envían a Llama3, que genera una respuesta sintetizada en lenguaje natural.
6. **Respuesta al Usuario**: La respuesta generada se envía de vuelta al frontend, donde el usuario puede visualizarla.

## Componentes

- **Frontend**: Proporciona una interfaz para interactuar con el sistema. Es donde el usuario envía sus preguntas.
- **Backend (Node.js y Express)**: Recibe las consultas del frontend, las envía al módulo de procesamiento en Python, y gestiona la comunicación entre el usuario y el sistema.
- **Script de Procesamiento (Python)**: Convierte las consultas en embeddings y las busca en la base de datos vectorial para obtener información relevante.
- **Base de Datos Vectorial (Chroma)**: Almacena los embeddings de los documentos, permitiendo realizar búsquedas eficientes basadas en similitudes.
- **Modelo de Lenguaje (LLM - Llama3 de Ollama)**: Genera respuestas en lenguaje natural a partir de los fragmentos de texto recuperados.

## Requisitos

1. **Node.js** y **Express** para el backend.
2. **Python 3.x** para el procesamiento de datos y la búsqueda en embeddings.
3. **Chroma** como base de datos vectorial para almacenar y recuperar embeddings.
4. **Ollama Llama3** como modelo de lenguaje para generar respuestas.
5. **LangChain** para la integración de los distintos componentes del sistema.

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/silfarias/RAG_LangChain_Ollama.git
```
2. Moverse al directorio `python`:
```bash
cd python
```
3. Instalar las dependencias necesarias:
```bash
pip install -r requirements.txt
```

4. **Asegurarse de cargar el documento pdf especifico en la carpeta data**

4. Salir del directorio python y dirigirse al directorio server, el cual es el backend del sistema:

```bash
cd server
```

5. Instalar las dependencias del backend:

```bash
npm install
```
o 
```bash
yarn install
```

6. Iniciar el backend:
```bash
npm start
```
7. Abrir una nueva terminal y dirigirse al directorio frontend:

```bash
cd frontend
```

8. Instalar las dependencias del frontend:

```bash
npm install
```

9. Iniciar el frontend:
```bash
npm start
```

10. Finalmente, en el navegador, acceder a la URL http://localhost:5173 para interactuar con el sistema.