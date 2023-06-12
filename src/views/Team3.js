import { useEffect, useState } from 'react'
import axios from 'axios';

import { Header } from "../components/Header";

import '../css/teams.css';

import teamBlue from '../images/teams/blue.jpeg';
import { Player } from "../components/Player";
import { Footer } from "../components/Footer";

export const Team3 = () => {
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
      const py = await axios(`${url}viewTeam1/3`);
      setPlayer(py.data);
   }

   const getCounterVisit = async () => {
      const vc = await axios(`${url}countVisitTeam3`);
      setVisitCounter(vc.data[0].visitTeam3);

      setCounterVisit();
   }

   const setCounterVisit = () => {
      axios.post(`${url}countVisitTeam3`, {
         page: 'Salome Ureña'
      })
   }

   return (
      <>
         <div className="team">
            <div className="BannerHome">
               <img src={teamBlue} />
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