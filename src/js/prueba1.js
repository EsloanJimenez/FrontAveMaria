import { useEffect, useState } from "react"
import axios from 'axios'

const url = 'http://localhost:9000/api/'
const urlOp = 'http://localhost:9000/api/operationStatisti/';    

const [team1, setTeam1] = useState([]);

useEffect(() => {
   getPrueba1();
}, [])

const getPrueba1 = async () => {
   const cal = await axios(`${url}filterCalendar`);
   setNameGameList(cal.data);
   
   const tem1 = await axios(`${url}statisticsTeam1/${cal.data[0].idCalendar}/${cal.data[0].team1}`);
   setTeam1(tem1.data);
}



export const prueba1 = async (index, player, op) => {
   let parameters;

   if(op) {
      player.points +=1;
      const newArr = [...team1];
      newArr[index] = player;
      setTeam1(newArr);

      parameters = {idStatistic: player.idStatistic, points: player.points};
            
      fetch(urlOp + player.idStatistic, {
         method: 'PUT',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(parameters)
      }).then(res => res.text())
         .then(res => {
            // getScore();
         });
   } else {
      player.points -=1;
      const newArr = [...team1];
      newArr[index] = player;
      setTeam1(newArr);
      
      parameters = {idStatistic: player.idStatistic, points: player.points};
            
      fetch(urlOp + player.idStatistic, {
         method: 'PUT',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(parameters)
      }).then(res => res.text())
         .then(res => {
            // getScore();
         })
   }
}