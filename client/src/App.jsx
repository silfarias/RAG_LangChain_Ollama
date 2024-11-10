import './App.css'

import { SiReaddotcv } from "react-icons/si";
import { TiMessages } from "react-icons/ti";
import { BsRobot } from "react-icons/bs";

function App() {

  return (
    <>
      <div id='box-body-app'>
        
        <div id='box-header'>
          <h2><span className='colorBlack'><BsRobot /></span> Sistema RAG <span className='colorBlack'><BsRobot /></span></h2>
        </div>
        <div id='boxChat'>
          
          <div id='chat'>
              <div id='boxChatOnline'>
                  <h3>¿En que puedo ayudarte?</h3>
              </div>
              <div id='boxChatMensajes'>
                  <ul id='ulChat'>
                      <li></li>
                  </ul>
              </div>
          </div>

          <form id='boxInput'>
              <input 
                  type="text" 
                  placeholder='Escriba su mensaje' 
              />
              <button type='submit'>Enviar</button>
          </form>
          
        </div>

      </div>
    </>
  )
}

export default App
