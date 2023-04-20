import { useEffect, useState } from 'react'
import axios from 'axios'

import '../css/teams.css'

export const Teams = () => {
   const [team, setTeam] = useState([]);

   useEffect(() => {
      getTeam();
   }, [])

   const getTeam = async () => {
      const te = await axios('http://localhost:9000/api/team');
      setTeam(te.data);
   }

   return(
      <div className='teams'>
         <section className='hide'>
            {
               team.map((reg, i) =>
                  <article key={i} className='fadeDown'>
                     <img width="300px" height="250px" src={'http://localhost:9000/' + reg.photoTeam} />
                     <img width="50px" src={'http://localhost:9000/' + reg.iconTeam} />
                  </article>
               )
            }
         </section>
      </div>
   )
}

