import { useEffect, useState } from 'react';
import '../css/board.css'
import axios from 'axios';

export const Board = ({ ptTeam1, ptTeam2, board }) => {
   const [pointsTeamA, setPointsTeamA] = useState(0);
   const [pointsTeamB, setPointsTeamB] = useState(0);
   const [faoutTeamA, setfaoutTeamA] = useState(0);
   const [faoutTeamB, setfaoutTeamB] = useState(0);
   const [timeOutTeamA, setTimeOutTeamA] = useState(0);
   const [timeOutTeamB, setTimeOutTeamB] = useState(0);
   const [cuarto, setCuarto] = useState(0);

   useEffect(() => {
      setValue();
      setRoom();
   }, [board[0].room]);
   
   const setRoom = async () => {

      const requestInit = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            game: ptTeam1.map(reg => reg.game),
            period: board[0].room,
            pointsTeamA: pointsTeamA,
            pointsTeamB: pointsTeamB,
            faoutTeamA: faoutTeamA,
            faoutTeamB: faoutTeamB,
            timeOutTeamA: timeOutTeamA,
            timeOutTeamB: timeOutTeamB,
         })
      }

      fetch('http://localhost:9000/api/roomPlayOff', requestInit)
      .then(res => res.text())
   }

   const setValue = () => {
      setPointsTeamA(ptTeam1.map(reg => reg.pt))
      setPointsTeamB(ptTeam2.map(reg => reg.pt))
      setfaoutTeamA(ptTeam1.map(reg => reg.ft))
      setfaoutTeamB(ptTeam2.map(reg => reg.ft))
   }

   console.log(`Puntos A: ${pointsTeamA}`);
   console.log(`Puntos B: ${pointsTeamB} `);
   console.log('===============');
   console.log(`Faout A: ${faoutTeamA}`);
   console.log(`Faout B: ${faoutTeamB}`);

   return (
      <>
         <section className="board">
            <article className='artBoard'>
               <table>
                  <tr>
                     <td className='value'>{ptTeam1.map(reg => reg.ft)}</td>
                     {/* <td id='time'>{board[0].timer}</td> */}
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
                     <td id='room'>{board[0].room == 5 ? 'OT' : board[0].room == 6 ? 'FINAL' : board[0].room > 6 ? 'FINAL/OT' : board[0].room < 1 ? '7:00 PM' : board[0].room}</td>
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
                  <tr>
                     <td>1</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                  </tr>
                  <tr>
                     <td>2</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                  </tr>
                  <tr>
                     <td>3</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                  </tr>
                  <tr>
                     <td>4</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                  </tr>
                  <tr>
                     <td>Extra</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                     <td>0</td>
                  </tr>
               </table>
            </article>
         </section>
      </>
   )
}