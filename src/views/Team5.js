import { useEffect, useState } from 'react'
import axios from 'axios';

import {Header} from "../components/Header";

import '../css/teams.css';

// import teamPurple from '../images/teams/purple.jpeg';
import { Player } from "../components/Player";

export const Team5 = () => {
    const [player, setPlayer] = useState([]);
    
    useEffect(() => {
       getPlayer();
 
       setInterval(() => {
          getPlayer();
       }, 10000)
    }, [])
 
    const getPlayer = async () => {
       const py = await axios(`https://apiavemaria.onrender.com/api/viewTeam1/5`);
       setPlayer(py.data);
    }

   return(
      <>
         <div className="team">
            <div className="BannerHome">
               {/* <div id="court"><img src={teamPurple} /></div> */}
            </div>
         </div>

         <Header />

         <Player
            player = {player}
         />
      </>
   )
}