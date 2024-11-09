import sys
import os
import warnings
import traceback
from langchain_ollama import ChatOllama
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_chroma import Chroma
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

warnings.filterwarnings("ignore", category=UserWarning, module="langchain_community.document_loaders.parsers.pdf")

def main():
    try:
        # Inicializa el modelo
        llm = ChatOllama(model="llama3")
        if llm is None:
            raise Exception("No se pudo instanciar el modelo Llama3")

        # Cargar y procesar documentos
        pdf_path = os.path.join(os.path.dirname(__file__), "data", "Learning-TensorFlow.pdf")
        loader = PyMuPDFLoader(pdf_path)
        # print(loader)
        documents = loader.load()
        
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=500)
        docs = text_splitter.split_documents(documents)

        # Crear embeddings y base de datos de vectores
        embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vs = Chroma.from_documents(
            documents=docs,
            embedding=embed_model,
            persist_directory="chroma_db_dir",
            collection_name="learning_tensorflow_data"
        )

        # Configura el retriever
        retriever = vs.as_retriever(search_kwargs={'k': 5})
        
        # Configura el prompt
        custom_prompt_template = """Usa la siguiente información para responder a la pregunta del usuario.
        Si no sabes la respuesta, simplemente di que no lo sabes, no intentes inventar una respuesta.

        Contexto: {context}
        Pregunta: {question}

        Solo devuelve la respuesta útil a continuación y nada más y responde siempre en español.
        Respuesta útil:
        """
        prompt = PromptTemplate(template=custom_prompt_template, input_variables=['context', 'question'])
        
        # Crea la cadena de QA
        qa = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=True,
            chain_type_kwargs={"prompt": prompt}
        )

        # Procesa la pregunta
        question = sys.argv[1] if len(sys.argv) > 1 else ""
        if not question:
            print("No se recibió ninguna pregunta.")
            sys.exit(1)

        response = qa({"query": question})
        print(response["result"])

    except Exception as e:
        print("Error:", e)
        traceback.print_exc()

if __name__ == "__main__":
    main()