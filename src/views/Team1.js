import { useEffect, useState } from 'react'
import axios from 'axios';

import { Header } from "../components/Header";

import '../css/teams.css';

import teamBlack from '../images/teams/black.jpg';
import { Player } from "../components/Player";
import { Footer } from "../components/Footer";

export const Team1 = () => {
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
      const py = await axios(`${url}viewTeam1/1`);
      setPlayer(py.data);
   }

   const getCounterVisit = async () => {
      const vc = await axios(`${url}countVisitTeam1`);
      setVisitCounter(vc.data[0].visitTeam1);

      setCounterVisit();
   }

   const setCounterVisit = () => {
      axios.post(`${url}countVisitTeam1`, {
         page: 'Los Cerros'
      })
   }

   return (
      <>
         <div className="team">
            <div className="BannerHome">
               <img src={teamBlack} />
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