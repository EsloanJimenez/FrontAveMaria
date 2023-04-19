// import { useEffect, useState } from 'react'
// import axios from 'axios';

import {Header} from "../components/Header";
import { EffectCurva } from "../components/EffectCurva";

import '../css/teams.css';

import teamBlack from '../images/teams/black.jpg';
import { Player } from "../components/Player";

export const Black = () => {
   // const url = 'http://localhost:9000/api/'

   // const [player, setPlayer] = useState([]);
   // const [playerStati, setPlayerStati] = useState([]);
   // const [playerTotalStati, setPlayerTotalStati] = useState([]);
   // const [playerPercentageStati, setPlayerPercentageStati] = useState([]);
   
   // useEffect(() => {
   //    getPlayer();

   //    setInterval(() => {
   //       getPlayer();
   //    }, 10000)
   // }, [])

   // const getPlayer = async () => {
   //    const py = await axios(`${url}viewTeam1/1`);
   //    setPlayer(py.data);

   //    const stati = await axios(`${url}viewPlayerStati/` + 17);
   //    setPlayerStati(stati.data);

   //    const totalStati = await axios(`${url}viewPlayerTotalStati/` + 17);
   //    setPlayerTotalStati(totalStati.data);

   //    const PercentageStati = await axios(`${url}viewPlayerPercentageStati/` + 17);
   //    setPlayerPercentageStati(PercentageStati.data);
   // }
   
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
            // player = {player}
            // playerStati = {playerStati}
            // playerTotalStati = {playerTotalStati}
            // playerPercentageStati = {playerPercentageStati}
         />

         <div id="opaco"></div>
      </>
   )
}