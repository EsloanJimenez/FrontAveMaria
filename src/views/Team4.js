import { useEffect, useState } from 'react'
import axios from 'axios';

import { Header } from "../components/Header";

import '../css/teams.css';

import teamOrange from '../images/teams/orange.jpeg';
import { Player } from "../components/Player";
import { Footer } from "../components/Footer";

export const Team4 = () => {
   const url = 'https://apiavemaria.onrender.com/api/';

   const [player, setPlayer] = useState([]);
   const [visitCounter, setVisitCounter] = useState();

   useEffect(() => {
      getPlayer();
      getCounterVisit();

      setInterval(() => {
         getPlayer();
      }, 10000)
   }, [])

   const getPlayer = async () => {
      const py = await axios(`${url}viewTeam1/4`);
      setPlayer(py.data);
   }

   const getCounterVisit = async () => {
      const vc = await axios(`${url}countVisitTeam4`);
      setVisitCounter(vc.data[0].visitTeam4);

      setCounterVisit();
   }

   const setCounterVisit = () => {
      axios.post(`${url}countVisitTeam4`, {
         page: 'Los Pinos'
      })
   }

   return (
      <>
         <div className="team">
            <div className="BannerHome">
               <div id="court"><img src={teamOrange} /></div>
            </div>
         </div>

         <Header />

         <Player
            player={player}
         />

         <Footer
            visitCounter={visitCounter}
         />
      </>
   )
}