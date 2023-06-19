import { useEffect, useState } from "react";
import axios from "axios";

import {Header} from "../components/Header";
import { LeadersC } from "../components/LeadersC";

import '../css/home.css';

const LeadersPlayOff = () => {
   const url = 'http://localhost:9000/api/'

   const [leaderPoints, setLeaderPoints] = useState([]);
   const [leaderAssists, setLeaderAssists] = useState([]);
   const [leaderRebounds, setLeaderRebounds] = useState([]);
   const [leaderStoppers, setLeaderStoppers] = useState([]);
   const [leaderRobberies, setLeaderRobberies] = useState([]);

   useEffect(() => {
      getLeaders();

      setInterval(() => {
         getLeaders();
      }, 10000)
   }, [])

   const getLeaders = async () => {
      const pt = await axios(`${url}statiPointPlayOff`);
      setLeaderPoints(pt.data);

      const as = await axios(`${url}statiAssistsPlayOff`);
      setLeaderAssists(as.data);

      const rbt = await axios(`${url}statiReboundsPlayOff`);
      setLeaderRebounds(rbt.data);

      const st = await axios(`${url}statiStoppersPlayOff`);
      setLeaderStoppers(st.data);

      const rbo = await axios(`${url}statiRobberiesPlayOff`);
      setLeaderRobberies(rbo.data);
   }
   
   return(
      <>
         <Header />

         <LeadersC
            leaderPoints={leaderPoints}
            leaderAssists={leaderAssists}
            leaderRebounds={leaderRebounds}
            leaderStoppers={leaderStoppers}
            leaderRobberies={leaderRobberies}
         />
      </>
   )
}

export default LeadersPlayOff