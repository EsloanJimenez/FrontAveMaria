import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Header } from "../components/Header";
import { Calendar } from "../components/Calendar";
import { Rankings } from "../components/Rankings";
import { Teams } from "../components/Teams";
import { Footer } from "../components/Footer";

import '../css/home.css';
import '../css/animaciones.css';

const Home = () => {
   const refRegular = useRef([]);
   const refPlayOff = useRef([]);
   const refRanking = useRef([]);
   const refTablePlayOffLeft = useRef([]);
   const refTablePlayOffRight = useRef([]);
   const refTeam = useRef([]);

   window.addEventListener('scroll', () => {
      let sizeVentana = window.innerHeight;

      for (let t = 0; t < refRegular.current.length; t++) {
         let distanciaTop = refRegular.current[t].getBoundingClientRect().top;

         if (distanciaTop <= sizeVentana) refRegular.current[t].classList.add('fade-Up');
         else refRegular.current[t].classList.remove('fade-Up');
      }

      for (let r = 0; r < refRanking.current.length; r++) {
         let distanciaRight = refRanking.current[r].getBoundingClientRect().top;

         if (distanciaRight <= sizeVentana) refRanking.current[r].classList.add('fade-Right');
         else refRanking.current[r].classList.remove('fade-Right');
      }

      for (let r = 0; r < refTablePlayOffRight.current.length; r++) {
         let distanciaRight = refTablePlayOffRight.current[r].getBoundingClientRect().top;

         if (distanciaRight <= sizeVentana) refTablePlayOffRight.current[r].classList.add('fade-Right');
         else refTablePlayOffRight.current[r].classList.remove('fade-Right');
      }

      for (let b = 0; b < refPlayOff.current.length; b++) {
         let distanciaBottom = refPlayOff.current[b].getBoundingClientRect().top;

         if (distanciaBottom <= sizeVentana) refPlayOff.current[b].classList.add('fade-Down');
         else refPlayOff.current[b].classList.remove('fade-Down');
      }

      for (let b = 0; b < refTeam.current.length; b++) {
         let distanciaBottom = refTeam.current[b].getBoundingClientRect().top;

         if (distanciaBottom <= sizeVentana) refTeam.current[b].classList.add('fade-Down');
         else refTeam.current[b].classList.remove('fade-Down');
      }

      for (let r = 0; r < refTablePlayOffLeft.current.length; r++) {
         let distanciaRight = refTablePlayOffLeft.current[r].getBoundingClientRect().top;

         if (distanciaRight <= sizeVentana) refTablePlayOffLeft.current[r].classList.add('fade-Left');
         else refTablePlayOffLeft.current[r].classList.remove('fade-Left');
      }
   })

   const url = 'http://localhost:9000/api/'

   const [calendar, setCalendar] = useState([]);
   const [calendarPlayOff, setCalendarPlayOff] = useState([]);
   const [leagueTeam, setLeagueTeam] = useState([]);
   const [visitCounter, setVisitCounter] = useState();

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

      const calPlayOff = await axios(`${url}calendarPlayOff`);
      setCalendarPlayOff(calPlayOff.data);

      const le = await axios(`${url}leagueTeam`);
      setLeagueTeam(le.data);
   }

   const getCounterVisit = async () => {
      const vc = await axios(`${url}countVisitHome`);
      setVisitCounter(vc.data[0].visitHome);

      setCounterVisit();
   }

   const setCounterVisit = () => {
      axios.post(`${url}countVisitHome`, {
         page: 'Home'
      })
   }

   return (
      <>
         <div className="background">
            <div className="BannerHome"></div>
         </div>

         <Header />

         <Calendar
            calendar={calendar}
            calendarPlayOff={calendarPlayOff}
            refRegular={refRegular}
            refPlayOff={refPlayOff}
         />

         <Rankings
            leagueTeam={leagueTeam}
            refRanking={refRanking}
            refTablePlayOffLeft={refTablePlayOffLeft}
            refTablePlayOffRight = {refTablePlayOffRight}
         />

         <Teams refTeam={refTeam} />

         <Footer
            visitCounter={visitCounter}
         />
      </>
   )
}

export default Home