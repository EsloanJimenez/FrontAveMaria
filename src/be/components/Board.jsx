import { useEffect, useState } from 'react';
import '../css/board.css'

export const Board = ({ ptTeam1, ptTeam2, board, periodo }) => {
   const [pointsTeamA, setPointsTeamA] = useState(0);
   const [pointsTeamB, setPointsTeamB] = useState(0);
   const [faoutTeamA, setfaoutTeamA] = useState(0);
   const [faoutTeamB, setfaoutTeamB] = useState(0);
   const [timeOutTeamA, setTimeOutTeamA] = useState(0);
   const [timeOutTeamB, setTimeOutTeamB] = useState(0)

   let temporizador, periodos;
   let pointsA = 0;
   let pointsB = 0;

   const elementoEncontrado = board.find(reg => reg.room >= 0);
   if(elementoEncontrado) {
      temporizador = elementoEncontrado.timer;
      periodos = elementoEncontrado.room;
   }
   else {
      console.log(`El elemento no fue encontrado`);
   }

   useEffect(() => {
      setListPeriod();
      setCondition();
   }, [periodos]);
   
   const setListPeriod = () => {
      setPointsTeamA(ptTeam1.map(reg => reg.pt))
      setPointsTeamB(ptTeam2.map(reg => reg.pt))
      setfaoutTeamA(ptTeam1.map(reg => reg.ft))
      setfaoutTeamB(ptTeam2.map(reg => reg.ft));
   }

   console.log(pointsTeamA);
   console.log(pointsTeamB);



   const setRoom = () => {
      const requestInit = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            game: ptTeam1.map(reg => reg.game),
            period: board[0].room-1,
            pointsTeamA: pointsA,
            pointsTeamB: pointsB,
            faoutTeamA: faoutTeamA,
            faoutTeamB: faoutTeamB,
            timeOutTeamA: timeOutTeamA,
            timeOutTeamB: timeOutTeamB,
         })
      }

      fetch('http://localhost:9000/api/roomPlayOff', requestInit)
      .then(res => res.text())
   }

   const setCondition = () => {
      if(pointsTeamA > 0) {
         console.log(`equipo ya no tiene 0`);
   
         pointsA = pointsTeamA - pointsA;
         pointsB = pointsTeamB - pointsB;
         
         setRoom();
      } else console.log(`El equipo a todavia tiene 0`);
   }

   return (
      <>
         <section className="board">
            <article className='artBoard'>
               <table>
                  <tr>
                     <td className='value'>{ptTeam1.map(reg => reg.ft)}</td>
                     <td id='time'>{temporizador}</td>
                     <td className='value'>{ptTeam2.map(reg => reg.ft)}</td>
                  </tr>
                  <tr>
                     <td><div></div><div></div><div></div><div></div><div></div></td>
                     <td></td>
                     <td><div></div><div></div><div></div><div></div><div></div></td>
                  </tr>
                  <tr>
                     <td>{ptTeam1.map(reg => reg.nameTeam)}</td>
                     <td></td>
                     <td>{ptTeam2.map(reg => reg.nameTeam)}</td>
                  </tr>
                  <tr>
                     <td className='value'>{ptTeam1.map(reg => reg.pt)}</td>
                     <td id='room'>{periodos == 5 ? 'OT' : periodos == 6 ? 'FINAL' : periodos > 6 ? 'FINAL/OT' : periodos < 1 ? '7:00 PM' : periodos}</td>
                     <td className='value'>{ptTeam2.map(reg => reg.pt)}</td>
                  </tr>
               </table>
            </article>

            <article className='artBoard'>
            <table>
                  <tr>
                     <td>Periodo</td>
                     <td>Puntos A</td>
                     <td>Puntos B</td>
                     <td>Faout A</td>
                     <td>Faout B</td>
                     <td>Time-Out A</td>
                     <td>Time-Out B</td>
                  </tr>
                  {
                     periodo.map((reg, i) => 
                        <tr key={i}>
                           <td>{reg.period}</td>
                           <td>{reg.pointsTeamA}</td>
                           <td>{reg.pointsTeamB}</td>
                           <td>{reg.faoutTeamA}</td>
                           <td>{reg.faoutTeamB}</td>
                           <td>{reg.timeOutTeamA}</td>
                           <td>{reg.timeOutTeamB}</td>
                        </tr>
                     )
                  }
               </table>
            </article>
         </section>
      </>
   )
}