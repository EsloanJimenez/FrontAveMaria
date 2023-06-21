import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import '../../css/main.css'
import '../../css/style.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleDown, faBars} from '@fortawesome/free-solid-svg-icons'

export const HeaderControler = () => {
   const [teamList, setTeamList] = useState([]);

   const refMain = useRef();
   const refSubMain1 = useRef();
   const refSubMain2 = useRef();
   
   const btnMain = () => {
      refMain.current.classList.toggle("view");
   }

   const subMainBtn1 = () => {
      if (window.innerWidth < 1024) {
         const height1 = refSubMain1.current.scrollHeight;

         if (refSubMain1.current.classList.contains("desplegar")) {
            refSubMain1.current.classList.remove("desplegar");
            refSubMain1.current.removeAttribute("style");
         } else {
            refSubMain1.current.classList.add("desplegar");
            refSubMain1.current.style.height = height1 + "px";
         }
      }
   }

   const subMainBtn2 = () => {
      if (window.innerWidth < 1024) {
         const height2 = refSubMain2.current.scrollHeight;

         if (refSubMain2.current.classList.contains("desplegar")) {
            refSubMain2.current.classList.remove("desplegar");
            refSubMain2.current.removeAttribute("style");
         } else {
            refSubMain2.current.classList.add("desplegar");
            refSubMain2.current.style.height = height2 + "px";
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
            <span className="navBar" onClick={btnMain}><FontAwesomeIcon icon={faBars} /><span>Liga Ave Maria</span></span> 
            <nav className="mainNav">
               <ul className='main' ref={refMain}>
                  <li><Link to="/">Inicio</Link></li>
                  <li className='containerSubMain'>
                     <Link to="#" className='subMainBtn' onClick={subMainBtn1}><span>Equipos</span><span><FontAwesomeIcon icon={faAngleDown} /></span></Link>
                     <ul className='subMain' ref={refSubMain1}>
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
                  <li className='containerSubMain'>
                     <Link to="#" className='subMainBtn' onClick={subMainBtn2}><span>Registros</span><span><FontAwesomeIcon icon={faAngleDown} /></span></Link>
                     <ul className='subMain' ref={refSubMain2}>
                        <li><Link to="/be/views/admin">Administradores</Link></li>
                        <li><Link to="/be/views/teams">Equipos</Link></li>
                        <li><Link to="/be/views/players">Jugadores</Link></li>
                        <li><Link to="/be/views/calendar">Calendario Regular</Link></li>
                        <li><Link to="/be/views/calendarPlayOff">Calendario PlayOff</Link></li>
                        <li><Link to="/be/views/statisticsPerGame">Estadisticas Por Juegos Regular</Link></li>
                        <li><Link to="/be/views/statisticsPerGamePlayOff">Estadisticas Por Juegos PlayOff</Link></li>
                     </ul>
                  </li>
                </ul>
            </nav>
         </header>
      </div>
   )
}