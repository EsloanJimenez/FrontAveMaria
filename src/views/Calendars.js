import { useEffect, useState } from "react";
import axios from "axios";

import {Header} from "../components/Header";
import { Calendar } from "../components/Calendar";

import '../css/home.css';

const Calendars = () => {
   const url = 'http://localhost:9000/api/'

   const [calendar, setCalendar] = useState([]);
   const [leagueTeam, setLeagueTeam] = useState([]);

   useEffect(() => {
      getCalendar();
      
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

   return(
      <>
         <Header />

         <Calendar
            calendar={calendar}
            leagueTeam={leagueTeam}
         />

         {/* <Footer /> */}

         <div id="opaco"></div>
      </>
   )  
}

export default Calendars