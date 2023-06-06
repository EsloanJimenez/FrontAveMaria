import { useEffect, useState } from "react";
import axios from "axios";

import {Header} from "../components/Header";
import { Calendar } from "../components/Calendar";
import { Rankings } from "../components/Rankings";
import { Teams } from "../components/Teams";

import '../css/home.css';
import '../css/animaciones.css';
import { Footer } from "../components/Footer";

const Home = () => {
   const fadeUp = document.querySelectorAll('.fadeUp');
   const fadeRight = document.querySelectorAll('.fadeRight');
   const fadeDown = document.querySelectorAll('.fadeDown');

   window.addEventListener('scroll', () => {
      let sizeVentana = window.innerHeight ;
      
      for (let t = 0; t < fadeUp.length; t++) {
         let distanciaTop = fadeUp[t].getBoundingClientRect().top;
         
         if(distanciaTop <= sizeVentana) fadeUp[t].classList.add('fade-Up');
         else fadeUp[t].classList.remove('fade-Up');
      }
   
      for (let r = 0; r < fadeRight.length; r++) {
         let distanciaRight = fadeRight[r].getBoundingClientRect().top;
   
         if (distanciaRight <= sizeVentana) fadeRight[r].classList.add('fade-Right');
         else fadeRight[r].classList.remove('fade-Right');
      }
   
      for(let b = 0; b < fadeDown.length; b++) {
         let distanciaBottom = fadeDown[b].getBoundingClientRect().top;
   
         if (distanciaBottom <= sizeVentana) fadeDown[b].classList.add('fade-Down');
         else fadeDown[b].classList.remove('fade-Down');
      }
   })

   const url = 'https://apiavemaria.onrender.com/api/'

   const [calendar, setCalendar] = useState([]);
   const [leagueTeam, setLeagueTeam] = useState([]);
   const [visitCounter, setVisitCounter] = useState();
   const [viewConuter, setViewCounter] = useState();

   useEffect(() => {
      getCalendar();
      getCounterVisit();
      
      setInterval(() => {
         getCalendar();
      }, 10000)
   }, [])

   const getCalendar = async () => {
      const cal = await axios(`${url}calendar`);
      setCalendar(cal.data);

      const le = await axios(`${url}leagueTeam`);
      setLeagueTeam(le.data);
   }
   
   const getCounterVisit = async () => {
      const vc = await axios(`${url}countVisit`);
      setVisitCounter(vc.data[0].visit);
      setViewCounter(vc.data[0].onView);

      setCounterVisit(vc.data[0].visit);
   }

   const setCounterVisit = (vt) => {
      axios.put(`${url}updateVisitCounter/1`, {
         idVisitConunter: 1,
         visit: vt+1,
         onView: 5
      })
   }

   return(
      <>
         <div className="background">
            <div className="BannerHome"></div>
         </div>

         <Header />

         <Calendar
            calendar={calendar}
         />

         <Rankings
            leagueTeam={leagueTeam}
         />

         <Teams />

         <Footer
            visitCounter={visitCounter}
            viewCounter={viewCounter}
         />
      </>
   )
}

export default Home