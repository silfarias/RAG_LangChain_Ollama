import './App.css';
import { useState, useEffect } from 'react';
import { useAskRag } from './hooks/useAskRag';
import { BsRobot } from "react-icons/bs";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const { askQuestion, response, setResponse, loading } = useAskRag();

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // añade el mensaje del usuario al chat
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: question }]);

    // envíamos pregunta al backend
    await askQuestion(question);

    setQuestion("");
  };

  // se ejecuta cada vez que 'response' cambia
  useEffect(() => {
    if (response) {
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: response }]);
      setResponse(null); // Limpiamos el response después de actualizar los mensajes
    }
  }, [response, setResponse]);
  

  return (
    <div id='box-body-app'>
      <div id='box-header'>
        <h2><span className='colorBlack'><BsRobot /></span> Sistema RAG <span className='colorBlack'><BsRobot /></span></h2>
      </div>
      <div id='boxChat'>
        <div id='chat'>
          <div id='boxChatOnline'>
            <h3>¿En qué puedo ayudarte?</h3>
          </div>
          <div id='boxChatMensajes'>
            <ul id='ulChat'>
              {messages.map((msg, index) => (
                <li key={index} className={msg.sender === "user" ? "userMessage" : "botMessage"}>
                  <strong>{msg.sender === "user" ? "Usuario:" : "IA:"}</strong> {msg.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form id='boxInput' onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder='Escriba su mensaje' 
            value={question} 
            onChange={handleInputChange}
          />
          <button type='submit' disabled={loading}>{loading ? "Enviando..." : "Enviar"}</button>
        </form>
      </div>
    </div>
  );
}

export default App;