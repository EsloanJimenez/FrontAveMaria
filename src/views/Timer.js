import { useState } from 'react'
import ReactHowler from 'react-howler'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPause, faPlay, faPlayCircle, faRotate } from "@fortawesome/free-solid-svg-icons"

import { closeClient } from '../js/RegistrationForm'
import { show_alerta } from '../js/Function'

import '../css/temporizador.css'

import audio from '../audio/camion.ogg';
import { Header } from '../components/Header'


export const Timer = () => {
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [option, setOption] = useState(false);

    let cronometro;
 
    //SELECIONANDO EL CRONOMETRO
    let mt = document.getElementById('mt');
    let sg = document.getElementById('sg');
 
    //SELECCIONANDO LOS BOTONES DE (START - PAUSE - RESET) BOTONES
    const btnStart = document.getElementById('start');
    const btnStop = document.getElementById('stop');
    const btnReset = document.getElementById('reset');

    //SELECCIONANDO EL FORMULARIO
    let mtInput = document.getElementById('mtInput');
    let sgInput = document.getElementById('sgInput');

    //DESABILITANDO LOS BOTONES
    // btnStart.disabled = true;
    // btnStop.disabled = true;
    // btnReset.disabled = true;
    
    // btnStart.style.cursor = 'no-drop';
    // btnStop.style.cursor = 'no-drop';
    // btnReset.style.cursor = 'no-drop';

    const start = () => {
        cronometro = setInterval(startInit, 1000);

        btnStart.disabled = true;
        btnStop.disabled = false;
        btnReset.disabled = false;
        
        btnStart.style.cursor = 'no-drop';
        btnStop.style.cursor = 'pointer';
        btnReset.style.cursor = 'pointer';

        setOption(false);
    }

    const reset = () => {
        clearInterval(cronometro);
  
        btnStart.disabled = false;
        btnStop.disabled = true;
  
        btnStart.style.cursor = 'pointer';
        btnStop.style.cursor = 'no-drop';
  
        sg.textContent = sgInput.value;
        mt.textContent = mtInput.value;
    }

    const startInit = () => {
        if(sg.textContent <= 0) {
           sg.textContent = 60;
           mt.textContent--;
  
           if(mt.textContent <= -1) {
            mt.textContent = '0' + 0;
            sg.textContent = '0' + 0;

            setOption(true);

            btnStart.disabled = true;
            btnStop.disabled = true;
            btnReset.disabled = true;
                 
            btnStart.style.cursor = 'no-drop';
            btnStop.style.cursor = 'no-drop';
            btnReset.style.cursor = 'no-drop';
  
            return clearInterval(cronometro)
           }
        }
        sg.textContent--;
    }

    const pause = () => {
        clearInterval(cronometro);

        btnStart.disabled = false;
        btnStop.disabled = true;
        btnReset.disabled = false;
        
        btnStart.style.cursor = 'pointer';
        btnStop.style.cursor = 'no-drop';
        btnReset.style.cursor = 'pointer';
    }

    const send = () => {
        if(sgInput.value <= -1 || mtInput.value <= -1) show_alerta('Por favor incluye valores numericos positivos', 'warning');
        if(isNaN(sgInput.value)) return show_alerta('No se permiten valores negativos ni alfabeticos', 'warning');

        mt.textContent = mtInput.value;
        sg.textContent = sgInput.value;

        btnStart.disabled = false;
        btnStart.style.cursor = 'pointer';

        show_alerta('Tiempo Enviado', 'success');
        closeClient();
    }
    

    const openModal = () => {
        const fund_new_client = document.querySelector(".container-form");
        fund_new_client.classList.remove('hide_font');
    
        window.setTimeout(() => {
           document.getElementById('mtInput').focus();
        }, 500)
     }

    return(
        <div className="container">
            <Header />
            <ReactHowler src={audio} playing={option} /> 

            <div className="timer">
                <table>
                    <tbody>
                        <tr>
                            <td colspan="3">
                                <button className="btn-light btn-register" onClick={() => openModal()}><span><FontAwesomeIcon icon={faCirclePlus} /></span></button>
                                <button className="btn-light btn-light-primary" id="start" onClick={start} ><span><FontAwesomeIcon icon={faPlay} /></span></button>
                                <button className="btn-light btn-light-delete" id="stop" onClick={pause} ><span><FontAwesomeIcon icon={faPause} /></span></button>
                                <button className="btn-light btn-light-secondary" id="reset" onClick={reset} ><span><FontAwesomeIcon icon={faRotate} /></span></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span id='mt' className="view">{minute}</span> 
                                <span> : </span>
                                <span id='sg' className="view">{second}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* SELECCIONAR TIME  */}
            <div className="container-form hide_font">
               <div className="card">
                  <div className="card-header">
                     <span className='title'>Seleccionar Tiempo</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>

                  <div className="card-body">
                        <div className="mb-3">
                            <label for="mtInput" className="form-label">Minuto</label>
                            <input type="number" className="form-control" id="mtInput" value={minute} name='mtInput' onChange={(e) => setMinute(e.target.value)} />
                           </div>
                        <div className="mb-3">
                           <label for="sgInput" className="form-label">Segundo</label>
                           <input type="number" className="form-control" id="sgInput" value={second} name="sgInput" onChange={(e) => setSecond(e.target.value)} />
                        </div>
                        <button onClick={send} className="btn btn-primary" >Seleccionar</button>
                  </div>
               </div>
            </div>
        </div>      
    )
}