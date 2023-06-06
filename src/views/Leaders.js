import { useEffect, useState } from "react";
import axios from "axios";

import { Header } from "../components/Header";
import { LeadersC } from "../components/LeadersC";
import { Footer } from "../components/Footer";

import '../css/home.css';

const Leaders = () => {
   const url = 'https://apiavemaria.onrender.com/api/'

   const [leaderPoints, setLeaderPoints] = useState([]);
   const [leaderAssists, setLeaderAssists] = useState([]);
   const [leaderRebounds, setLeaderRebounds] = useState([]);
   const [leaderStoppers, setLeaderStoppers] = useState([]);
   const [leaderRobberies, setLeaderRobberies] = useState([]);

   const [visitCounter, setVisitCounter] = useState();
   const [viewConuter, setViewCounter] = useState();

   useEffect(() => {
      getLeaders();
      getCounterVisit();

      setInterval(() => {
         getLeaders();
      }, 10000)
   }, [])

   const getLeaders = async () => {
      const pt = await axios(`${url}statiPoint`);
      setLeaderPoints(pt.data);

      const as = await axios(`${url}statiAssists`);
      setLeaderAssists(as.data);

      const rbt = await axios(`${url}statiRebounds`);
      setLeaderRebounds(rbt.data);

      const st = await axios(`${url}statiStoppers`);
      setLeaderStoppers(st.data);

      const rbo = await axios(`${url}statiRobberies`);
      setLeaderRobberies(rbo.data);
   }

   const getCounterVisit = async () => {
      const vc = await axios(`${url}countVisit/6`);
      setVisitCounter(vc.data[0].visit);
      setViewCounter(vc.data[0].onView);

      setCounterVisit(vc.data[0].visit);
   }

   const setCounterVisit = (vt) => {
      const randon = Math.trunc(Math.random() * 9);

      axios.put(`${url}updateVisitCounter/6`, {
         idVisitConunter: 6,
         visit: vt + 1,
         onView: randon
      })
   }

   return (
      <>
         <Header />

         <LeadersC
            leaderPoints={leaderPoints}
            leaderAssists={leaderAssists}
            leaderRebounds={leaderRebounds}
            leaderStoppers={leaderStoppers}
            leaderRobberies={leaderRobberies}
         />

         <Footer
            visitCounter={visitCounter}
            viewCounter={viewConuter}
         />
      </>
   )
}

export default Leaders