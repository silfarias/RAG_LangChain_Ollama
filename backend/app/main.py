from fastapi import FastAPI
from app.routers import ask
from fastapi.middleware.cors import CORSMiddleware

# instanciamos la app con FastAPI
app = FastAPI()

# configuramos cors para permitir el acceso desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  # permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # permite todos los headers
)

# incluimos los rutas
app.include_router(ask.router)

# ruta de inicio
@app.get("/")
def index():
    return {"message": "Bienvenido al sistema RAG con FastAPI"}