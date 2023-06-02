import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import '../css/main.css'
import '../css/style.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown, faBars} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export const Header = () => {
   const [teamList, setTeamList] = useState([]);

   useEffect(() => {
      getTeamList();

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

   const getTeamList = async () => {
      const tl = await axios(`https://apiavemaria.onrender.com/api/team`);
      setTeamList(tl.data);
   }

   return(
      <div id="home">
          {/* ----- HEADER ----- */}
         <header>
            <span className="navBar" id="btnMain"><FontAwesomeIcon icon={faBars} /><span>Torneo Salome Ureña 2023</span></span> 
            <nav className="mainNav">
               <ul className='main' id='main'>
                  <li><Link to="/">Inicio</Link></li>
                  <li><Link to="/views/timer">Temporizador</Link></li>
                  <li className='containerSubMain'>
                     <Link className='subMainBtn'><span>Equipos</span><span><FontAwesomeIcon icon={faAngleDown} /></span></Link>
                     <ul className='subMain'>
                        {
                           teamList.map((reg, i) =>
                              <li key={i}>
                                 <Link to={`/views/${reg.idTeam}`}>{reg.nameTeam}</Link>
                              </li>
                           )
                        }
                     </ul>
                  </li>
                  <li><Link to="/views/leaders">Estadisticas</Link></li>
                  <li><Link to="/views/rules">Reglas</Link></li>
                  <li className='invisible'><Link to="/be/views/admin">Back End</Link></li>
                </ul>
            </nav>
         </header>
      </div>
   )
}