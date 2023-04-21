import { useEffect, useState } from 'react'
import axios from 'axios';

import {Header} from "../components/Header";
import { EffectCurva } from "../components/EffectCurva";

import '../css/teams.css';

import teamRed from '../images/teams/red.jpeg';
import { Player } from "../components/Player";

export const Team2 = () => {
   const [player, setPlayer] = useState([]);
   
   useEffect(() => {
      getPlayer();

      setInterval(() => {
         getPlayer();
      }, 10000)
   }, [])

   const getPlayer = async () => {
      const py = await axios(`https://apiavemaria.onrender.com/api/viewTeam1/2`);
      setPlayer(py.data);
   }

   return(
      <>
         <div className="team">
            <div className="BannerHome">
               <img src={teamRed} />
            </div>
         </div>

         <Header />

         <EffectCurva />

         <Player
            player = {player}
         />
      </>
   )
}