// src/App.js
import './App.css';
import { BsRobot } from "react-icons/bs";
import { useState } from 'react';
import useFetchData from '../src/hook/useFetchData.js';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const { data, loading } = useFetchData(inputValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Añade el mensaje del usuario a la lista
    setMessages([...messages, { from: 'user', text: inputValue }]);
    setInputValue(''); // Limpia el campo de input
  };

  // Si hay una respuesta del backend, añade el mensaje del sistema
  if (data && !loading && !messages.find(msg => msg.text === data.result)) {
    setMessages([...messages, { from: 'system', text: data.result }]);
  }

  return (
    <>
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
                        <li key={index} className={msg.from === 'user' ? 'user-message' : 'system-message'}>
                          {msg.text}
                        </li>
                      ))}
                  </ul>
              </div>
          </div>

          <form id='boxInput' onSubmit={handleSubmit}>
              <input 
                  type="text" 
                  placeholder='Escriba su mensaje' 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
              />
              <button type='submit'>Enviar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
