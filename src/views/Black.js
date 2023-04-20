import { useEffect, useState } from 'react'
import axios from 'axios';

import {Header} from "../components/Header";
import { EffectCurva } from "../components/EffectCurva";

import '../css/teams.css';

import teamBlack from '../images/teams/black.jpg';
import { Player } from "../components/Player";

export const Black = () => {
   const url = 'http://localhost:9000/api/'

   const [player, setPlayer] = useState([]);

   useEffect(() => {
      getPlayer();

      setInterval(() => {
         getPlayer();
      }, 10000)
   }, [])

   const getPlayer = async () => {
      const py = await axios(`${url}viewTeam1/1`);
      setPlayer(py.data);
   }
   
   return(
      <>
         <div className="team">
            <div className="BannerHome">
               <div id="court"><img src={teamBlack} /></div>
            </div>
         </div>

         <Header />

         <EffectCurva />

         <Player
            player = {player}
         />

         <div id="opaco"></div>
      </>
   )
}