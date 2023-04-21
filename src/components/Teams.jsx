import { useEffect, useState } from 'react'
import axios from 'axios'

import '../css/teams.css'

export const Teams = () => {
   const [team, setTeam] = useState([]);

   useEffect(() => {
      getTeam();
   }, [])

   const getTeam = async () => {
      const te = await axios('https://apiavemaria.onrender.com/api/team');
      setTeam(te.data);
   }

   return(
      <div className='teams'>
         <section className='hide'>
            {
               team.map((reg, i) =>
                  <article key={i} className='fadeDown'>
                     <img width="300px" height="250px" src={'https://apiavemaria.onrender.com/' + reg.photoTeam} />
                     <img width="50px" src={'https://apiavemaria.onrender.com/' + reg.iconTeam} />
                  </article>
               )
            }
         </section>
      </div>
   )
}

