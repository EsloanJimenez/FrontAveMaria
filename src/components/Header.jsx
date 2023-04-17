import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import '../css/main.css'
import '../css/style.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown, faBars} from '@fortawesome/free-solid-svg-icons'

export const Header = () => {
   useEffect(() => {
      const btnMain = document.querySelector("#btnMain");
      const main = document.querySelector("#main");

      btnMain.addEventListener("click", () => {
         main.classList.toggle("view");
      });

      const subMainBtn = document.querySelector(".subMainBtn");

      subMainBtn.addEventListener("click", () => {
      if (window.innerWidth < 1024) {
         const subMain = document.querySelector(".subMain");
         const height = subMain.scrollHeight;

         if (subMain.classList.contains("desplegar")) {
            subMain.classList.remove("desplegar");
            subMain.removeAttribute("style");
         } else {
            subMain.classList.add("desplegar");
            subMain.style.height = height + "px";
         }
      }
      });
   }, [])

   return(
      <div id="home">
          {/* ----- HEADER ----- */}
         <header>
            <span class="navBar" id="btnMain"><FontAwesomeIcon icon={faBars} /><span>Liga Ave Maria</span></span> 
            <nav className="mainNav">
               <ul className='main' id='main'>
                  <li><Link to="/">Inicio</Link></li>
                  <li><Link to="/views/timer">Temporizador</Link></li>
                  {/* <li><Link to="/views/calendars">Calendario</Link></li> */}
                  <li className='containerSubMain'>
                     <Link className='subMainBtn'><span>Equipos</span><span><FontAwesomeIcon icon={faAngleDown} /></span></Link>
                     <ul className='subMain'>
                        <li><Link to="/views/blue">Azul</Link></li>
                        <li><Link to="/views/red">Rojo</Link></li>
                        <li><Link to="/views/white">Blanco</Link></li>
                        <li><Link to="/views/black">Negro</Link></li>
                        <li><Link to="/views/yellow">Amarillo</Link></li>
                        <li><Link to="/views/morado">purple</Link></li>
                     </ul>
                  </li>
                  <li><Link to="/views/leaders">Estadisticas</Link></li>
                  <li><Link to="/views/rules">Reglas</Link></li>
                </ul>
            </nav>
         </header>
      </div>
   )
}