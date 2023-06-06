import { useEffect, useState } from 'react'
import axios from 'axios';

import { Header } from "../components/Header";

import '../css/teams.css';

import teamRed from '../images/teams/red.jpeg';
import { Player } from "../components/Player";
import { Footer } from "../components/Footer";

export const Team2 = () => {
   const url = 'https://apiavemaria.onrender.com/api/';

   const [player, setPlayer] = useState([]);
   const [visitCounter, setVisitCounter] = useState();
   const [viewConuter, setViewCounter] = useState();

   useEffect(() => {
      getPlayer();
      getCounterVisit();

      setInterval(() => {
         getPlayer();
      }, 10000)
   }, [])

   const getPlayer = async () => {
      const py = await axios(`${url}viewTeam1/2`);
      setPlayer(py.data);
   }

   const getCounterVisit = async () => {
      const vc = await axios(`${url}countVisit/3`);
      setVisitCounter(vc.data[0].visit);
      setViewCounter(vc.data[0].onView);

      setCounterVisit(vc.data[0].visit);
   }

   const setCounterVisit = (vt) => {
      const randon = Math.trunc(Math.random() * 99);

      axios.put(`${url}updateVisitCounter/3`, {
         idVisitConunter: 3,
         visit: vt + 1,
         onView: randon
      })
   }

   return (
      <>
         <div className="team">
            <div className="BannerHome">
               <img src={teamRed} />
            </div>
         </div>

         <Header />

         <Player
            player={player}
         />

         <Footer
            visitCounter={visitCounter}
            viewCounter={viewConuter}
         />
      </>
   )
}