import { useEffect, useState } from 'react'
import axios from 'axios';

import {Header} from "../components/Header";
import { EffectCurva } from "../components/EffectCurva";

import '../css/teams.css';

import teamBlue from '../images/teams/blue.jpeg';
import { Player } from "../components/Player";

export const Blue = () => {
   const url = 'http://localhost:9000/api/'

   const [player, setPlayer] = useState([]);
   const [playerStati, setPlayerStati] = useState([]);
   const [playerTotalStati, setPlayerTotalStati] = useState([]);
   const [playerPercentageStati, setPlayerPercentageStati] = useState([]);
   
   useEffect(() => {
      getPlayer();

      setInterval(() => {
         getPlayer();
      }, 10000)
   }, [])

   const getPlayer = async () => {
      const py = await axios(`${url}viewTeam1/4`);
      setPlayer(py.data);

      const stati = await axios(`${url}viewPlayerStati`);
      setPlayerStati(stati.data);

      const totalStati = await axios(`${url}viewPlayerTotalStati`);
      setPlayerTotalStati(totalStati.data);

      const PercentageStati = await axios(`${url}viewPlayerPercentageStati`);
      setPlayerPercentageStati(PercentageStati.data);

      alert('funciono la prueba')
   }

   return(
      <>
         <div className="team">
            <div className="BannerHome">
               <img src={teamBlue} />
            </div>
         </div>

         <Header />

         <EffectCurva />

         <Player
            player = {player}
            playerStati = {playerStati}
            playerTotalStati = {playerTotalStati}
            playerPercentageStati = {playerPercentageStati}
         />

         {/* <AsideBanner />

         <EffectCurva />

         <Experiencia />

         <Footer /> */}

         <div id="opaco"></div>
      </>
   )
}
