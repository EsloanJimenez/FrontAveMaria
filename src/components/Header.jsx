import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import '../css/main.css'
import '../css/style.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown, faBars} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export const Header = () => {
   const [teamList, setTeamList] = useState([]);

   const refMain = useRef();
   const refSubMain = useRef();
   
   const btnMain = () => {
      refMain.current.classList.toggle("view");
   }

   const subMainBtn = () => {
      if (window.innerWidth < 1024) {
         const height = refSubMain.current.scrollHeight;

         if (refSubMain.current.classList.contains("desplegar")) {
            refSubMain.current.classList.remove("desplegar");
            refSubMain.current.removeAttribute("style");
         } else {
            refSubMain.current.classList.add("desplegar");
            refSubMain.current.style.height = height + "px";
         }
      }
   }

   useEffect(() => {
      getTeamList();
   }, [])

   const getTeamList = async () => {
      const tl = await axios(`http://localhost:9000/api/team`);
      setTeamList(tl.data);
   }

   return(
      <div id="home">
          {/* ----- HEADER ----- */}
         <header>
            <span className="navBar" onClick={btnMain} ><FontAwesomeIcon icon={faBars} /><span>Liga Ave Maria</span></span> 
            <nav className="mainNav">
               <ul ref={refMain} className='main'>
                  <li><Link to="/">Inicio</Link></li>
                  <li><Link to="/views/timer">Temporizador</Link></li>
                  <li className='containerSubMain'>
                     <Link className='subMainBtn' onClick={subMainBtn}><span>Equipos</span><span><FontAwesomeIcon icon={faAngleDown} /></span></Link>
                     <ul className='subMain' ref={refSubMain}>
                        {
                           teamList.map((reg, i) =>
                              <li key={i}>
                                 <Link to={`/views/${reg.idTeam}`}>{reg.nameTeam}</Link>
                              </li>
                              
                           )
                        }
                     </ul>
                  </li>
                  <li><Link to="/views/leadersRegular">Estadisticas Regular</Link></li>
                  <li><Link to="/views/leadersPlayOff">Estadisticas PlayOff</Link></li>
                  <li><Link to="/views/rules">Reglas</Link></li>
                </ul>
            </nav>
         </header>
      </div>
   )
}