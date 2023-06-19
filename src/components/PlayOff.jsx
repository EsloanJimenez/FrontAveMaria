import { useEffect, useState } from 'react';
import axios from 'axios';

import '../css/playOff.css'

export const PlayOff = () => {
   const url = 'https://apiavemaria.onrender.com/api/';

   const [calendar, setCalendar] = useState([]);

   useEffect(() => {
      getPlayOff();
   }, []);

   const getPlayOff = async () => {
      const po = await axios(`${url}calendarPlayOff`);
      setCalendar(po.data);
   }

   return (
      <div className="playOff">
         <h2>PLAYOFFS</h2>
         <svg viewBox='0 0 600 400' className='hide'>
            <line x1="280" y1="60" x2="385" y2="60" stroke="black" stroke-width="2"></line>
            <line x1="180" y1="60" x2="280" y2="60" stroke="black" stroke-width="2"></line>
            <line x1="280" y1="60" x2="280" y2="255" stroke="black" stroke-width="2"></line>
            <line x1="280" y1="160" x2="385" y2="160" stroke="black" stroke-width="2"></line>
            <line x1="175" y1="160" x2="280" y2="160" stroke="black" stroke-width="2"></line>
            <line x1="280" y1="160" x2="280" y2="255" stroke="black" stroke-width="2"></line>
            <line x1="175" y1="255" x2="280" y2="255" stroke="black" stroke-width="2"></line>
            <line x1="280" y1="255" x2="385" y2="255" stroke="black" stroke-width="2"></line>
            <line x1="280" y1="360" x2="280" y2="255" stroke="black" stroke-width="2"></line>
            <line x1="280" y1="360" x2="385" y2="360" stroke="black" stroke-width="2"></line>
            <line x1="175" y1="360" x2="280" y2="360" stroke="black" stroke-width="2"></line>
         </svg>

         {
            calendar.map((reg, i) => (
               <div key={i} className='playInn' id={i == 1 ? 'round2' : i == 2 ? 'round3' : i == 3 ? 'round4' : ''}>
                  <div className='teamA fadeUp'>
                     <img width="50px" src={`https://apiavemaria.onrender.com/${reg.photoTeam1}`} alt="imagen rota" />
                     {reg.nameTeam1}
                  </div>

                  <div className='won'>
                     <span>{reg.gameWon1}</span>
                     <span>{reg.gameWon2}</span>
                  </div>

                  <div className="teamB fadeRight">
                     {reg.nameTeam2}
                     <img width="50px" src={`https://apiavemaria.onrender.com/${reg.photoTeam2}`}/>
                  </div>
               </div>
            ))
         }
      </div>
   )
}