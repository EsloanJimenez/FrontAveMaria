import { useEffect, useState } from 'react';
import '../css/board.css'

let temporizador, periodos, i = 0;

export const Board = ({ ptTeam1, ptTeam2, board, periodo, room }) => {
   const elementoEncontrado = board.find(reg => reg.room >= 0);

   if (elementoEncontrado) {
      temporizador = elementoEncontrado.timer;
      periodos = elementoEncontrado.room;
   }
   else {
      console.log(`El elemento no fue encontrado`);
   }

   useEffect(() => {
      const requestInit = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            game: ptTeam1.map(reg => reg.game),
            period: i + 1,
            pointsTeamA: 0,
            pointsTeamB: 0,
            faoutTeamA: 0,
            faoutTeamB: 0,
            timeOutTeamA: 0,
            timeOutTeamB: 0,
         })
      }

      fetch('http://localhost:9000/api/roomPlayOff', requestInit)
         .then(res => res.text())
      // }
   }, [periodos]);

   return (
      <>
         <section className="board">
            <article className='artBoard'>
               <table>
                  <tr>
                     <td className='value'>{room.map(reg => reg.faoutTeamA)}</td>
                     <td id='time'>{temporizador}</td>
                     <td className='value'>{room.map(reg => reg.faoutTeamB)}</td>
                  </tr>
                  <tr>
                     <td>
                        <input type='checkbox' id='timeOutA1' />
                        <label htmlFor="timeOutA1"></label>

                        <input type='checkbox' id='timeOutA2' />
                        <label htmlFor="timeOutA2"></label>

                        <input type='checkbox' id='timeOutA3' />
                        <label htmlFor="timeOutA3"></label>
                     </td>
                     <td></td>
                     <td>
                        <input type='checkbox' id='timeOutB1' />
                        <label htmlFor="timeOutB1"></label>

                        <input type='checkbox' id='timeOutB2' />
                        <label htmlFor="timeOutB2"></label>

                        <input type='checkbox' id='timeOutB3' />
                        <label htmlFor="timeOutB3"></label>
                     </td>
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