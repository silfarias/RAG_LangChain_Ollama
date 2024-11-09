import os
import warnings
from langchain_ollama import ChatOllama
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_chroma import Chroma
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

# suprime warnings innecesarios
warnings.filterwarnings("ignore", category=UserWarning, module="langchain_community.document_loaders.parsers.pdf")

try:
    # inicializa el modelo LLM
    llm = ChatOllama(model="llama3")
    if llm is None:
        raise Exception("No se pudo instanciar el modelo Llama3")

    # ruta del pdf
    pdf_path = "data/Learning-TensorFlow.pdf"

    # carga y divide documentos
    loader = PyMuPDFLoader(pdf_path)
    documents = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=500,
    )
    docs = text_splitter.split_documents(documents)

    # crear embeddings y base de datos de vectores
    embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vs = Chroma.from_documents(
        documents=docs,
        embedding=embed_model,
        persist_directory="chroma_db_dir",
        collection_name="learning_tensorflow_data"
    )
    print("Base de datos de vectores creada y guardada.")

    # configura el retriever
    retriever = vs.as_retriever(search_kwargs={'k': 5})
    
    # configuramos un prompt personalizado
    custom_prompt_template = """Usa la siguiente información para responder a la pregunta del usuario.
    Si no sabes la respuesta, simplemente di que no lo sabes, no intentes inventar una respuesta.

    Contexto: {context}
    Pregunta: {question}

    Solo devuelve la respuesta útil a continuación y nada más y responde siempre en español.
    Respuesta útil:
    """
    prompt = PromptTemplate(template=custom_prompt_template, input_variables=['context', 'question'])
    
    # crea la cadena de QA con recuperación
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt}
    )

    # obtiene y procesa la pregunta del usuario en la terminal
    while True:
        question = input("Ingrese su pregunta (o 'salir' para terminar): ")
        if question.lower() == "salir":
            break
        response = qa({"query": question})

        # muestra la respuesta y metadatos de las fuentes en pantalla
        print("\nRespuesta:", response["result"])
        metadata = [(doc.metadata.get('page', 'Desconocido'), doc.metadata.get('file_path', 'Desconocido')) for doc in response['source_documents']]
        print("Fuentes utilizadas (página, archivo):", metadata)

except Exception as e:
    print("Error:", e)