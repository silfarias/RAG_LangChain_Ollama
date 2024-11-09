from langchain_community.llms import Ollama
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

try:
    # Inicializar modelo LLM
    llm = Ollama(model="llama3")
    if llm is None:
        raise Exception("No se pudo instanciar el modelo Llama3")

    # Cargar y dividir documentos
    loader = PyMuPDFLoader("data/Learning-TensorFlow.pdf")
    datapdf = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=500,
    )
    docs = text_splitter.split_documents(datapdf)
    
    # Crear embeddings y vector store
    embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    
    vs = Chroma.from_documents(
        documents=docs,
        embedding=embed_model,
        persist_directory="chroma_db_dir",
        collection_name="learning_tensorflow_data"
    )
    
    # Configurar el retriever
    retriever = vs.as_retriever(search_kwargs={'k': 3})
    
    # Configurar el prompt template personalizado
    custom_prompt_template = """Usa la siguiente información para responder a la pregunta del usuario.
    Si no sabes la respuesta, simplemente di que no lo sabes, no intentes inventar una respuesta.

    Contexto: {context}
    Pregunta: {question}

    Solo devuelve la respuesta útil a continuación y nada más y responde siempre en español.
    Respuesta útil:
    """
    prompt = PromptTemplate(template=custom_prompt_template, input_variables=['context', 'question'])
    
    # Crear la cadena de QA con recuperación
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt}
    )
    
    # Ejecutar una consulta de prueba
    question = "¿Qué es TensorFlow y cómo se utiliza en el aprendizaje profundo?"
    response = qa({"query": question})
    
    # Obtener respuesta y metadatos
    print("Respuesta:", response["result"])
    metadata = [(doc.metadata['page'], doc.metadata['file_path']) for doc in response['source_documents']]
    print("Metadatos de las fuentes:", metadata)

except Exception as e:
    print("Error:", e)