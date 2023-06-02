import { useEffect, useState } from 'react'
import axios from 'axios';

import {Header} from "../components/Header";

import '../css/teams.css';

import teamBlue from '../images/teams/blue.jpeg';
import { Player } from "../components/Player";

export const Team4 = () => {
    const [player, setPlayer] = useState([]);
    
    useEffect(() => {
       getPlayer();
 
       setInterval(() => {
          getPlayer();
       }, 10000)
    }, [])
 
    const getPlayer = async () => {
       const py = await axios(`https://apiavemaria.onrender.com/api/viewTeam1/4`);
       setPlayer(py.data);
    }

   return(
      <>
         <div className="team">
            <div className="BannerHome">
               <div id="court"><img src={teamBlue} /></div>
            </div>
         </div>

         <Header />

         <Player
            player = {player}
         />
      </>
   )
}