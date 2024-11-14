import './App.css';
import { useState, useEffect } from 'react';
import { useAskRag } from './hooks/useAskRag';
import { BsRobot } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

function App() {

  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const { askQuestion, response, loading } = useAskRag();

  const [showModal, setShowModal] = useState(true);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setShowModal(false);
    }
  };

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { sender: username, text: question }]);

    await askQuestion(question);

    setQuestion("");
  };

  useEffect(() => {
    if (response) {
      setMessages((prevMessages) => [...prevMessages, { sender: "Sherlock AI", text: response }]);
      setQuestion("");
    }
  }, [response]);

  return (
    <div className="app-container">
      {showModal && (
        <div className="modal">
          <form onSubmit={handleNameSubmit} className="modal-form">
            <h2>Ingrese su nombre</h2>
            <input 
              type="text" 
              placeholder="Nombre de usuario" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Aceptar</button>
          </form>
        </div>
      )}
      
      <div className="app-header">
        <h1><span className="icon"><BsSearch /></span> Sherlock Docs <span className="icon"><BsSearch /></span></h1>
        <p className="slogan">"Tu aliado en la búsqueda de la verdad"</p>
      </div>
      
      <div className="chat-container">
        <div className="chat-messages">
          <h3>¿En qué puedo ayudarte, investigador?</h3>
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className={msg.sender === username ? "user-message" : "bot-message"}>
                <strong>{msg.sender}:</strong> {msg.text}
              </li>
            ))}
          </ul>
        </div>
        
        <form className="input-container" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Escriba su mensaje" 
            value={question} 
            onChange={handleInputChange} 
          />
          <button type="submit" disabled={loading}>{loading ? "Enviando..." : "Enviar"}</button>
        </form>
      </div>
    </div>
  );
}

export default App;