import { useEffect, useState } from 'react'
import axios from 'axios';

import {Header} from "../components/Header";

import '../css/teams.css';

import teamBlue from '../images/teams/blue.jpeg';
import { Player } from "../components/Player";

export const Team3 = () => {
   const [player, setPlayer] = useState([]);
   
   useEffect(() => {
      getPlayer();

      setInterval(() => {
         getPlayer();
      }, 10000)
   }, [])

   const getPlayer = async () => {
      const py = await axios(`http://localhost:9000/api/viewTeam1/3`);
      setPlayer(py.data);
   }

   return(
      <>
         <div className="team">
            <div className="BannerHome">
               <img src={teamBlue} />
            </div>
         </div>

         <Header />

         <Player
            player = {player}
         />
      </>
   )
}