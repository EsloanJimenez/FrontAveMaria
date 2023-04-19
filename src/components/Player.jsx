// import { useEffect, useState } from 'react'
// import axios from 'axios';

import '../css/player.css'

export const Player = ({player, playerStati, playerTotalStati, playerPercentageStati}) => {
   // const [player, setPlayer] = useState([]);
   // const [playerStati, setPlayerStati] = useState([]);
   // const [playerTotalStati, setPlayerTotalStati] = useState([]);
   // const [playerPercentageStati, setPlayerPercentageStati] = useState([]);
   
   // useEffect(() => {
   //    getPlayer();
   // }, [])

   // const getPlayer = async (id) => {
   //    console.log(id);
   //    const py = await axios('http://localhost:9000/api/viewTeam1/1');
   //    setPlayer(py.data);

   //    const stati = await axios('http://localhost:9000/api/viewPlayerStati/' + 9);
   //    setPlayerStati(stati.data);

   //    const totalStati = await axios('http://localhost:9000/api/viewPlayerTotalStati');
   //    setPlayerTotalStati(totalStati.data);

   //    const PercentageStati = await axios('http://localhost:9000/api/viewPlayerPercentageStati');
   //    setPlayerPercentageStati(PercentageStati.data);
   // }

   return(
         <section className='player'>
            {
               player.map((reg) =>
                  <article>
                     <aside>
                        <img src={`http://localhost:9000/${reg.photo}`} alt="imagen rota" />
                        <figcaption>
                           <p>{reg.fullName}</p>
                           <p>{reg.jacket}</p>
                        </figcaption>
                     </aside>
                     <table>
                        <tr>
                           <td>Juego</td><td>Pt</td><td>As</td><td>Rb</td><td>Tp</td><td>Rbs</td><td>Fat</td>
                        </tr>
                        {
                           playerStati.map((reg, i) =>
                              <tr>
                                 <td>
                                    {i+1}
                                 </td>
                                 <td>
                                    {reg.points}
                                 </td>
                                 <td>
                                    {reg.assists}
                                 </td>
                                 <td>
                                    {reg.rebounds}
                                 </td>
                                 <td>
                                    {reg.stoppers}
                                 </td>
                                 <td>
                                    {reg.robberies}
                                 </td>
                                 <td>
                                    {reg.faults}
                                 </td>
                              </tr>
                           )
                        }
                        
                        {
                           playerTotalStati.map(reg => 
                              <tr>
                                 <td>
                                    Total
                                 </td>
                                 <td>
                                    {reg.pt}
                                 </td>
                                 <td>
                                    {reg.ast}
                                 </td>
                                 <td>
                                    {reg.rbt}
                                 </td>
                                 <td>
                                    {reg.st}
                                 </td>
                                 <td>
                                    {reg.rb}
                                 </td>
                                 <td>
                                    {reg.ft}
                                 </td>
                              </tr>   
                           )
                        }
                        {
                           playerPercentageStati.map(reg => 
                              <tr>
                                 <td>
                                    %
                                 </td>
                                 <td>
                                    {reg.pt}
                                 </td>
                                 <td>
                                    {reg.ast}
                                 </td>
                                 <td>
                                    {reg.rbt}
                                 </td>
                                 <td>
                                    {reg.st}
                                 </td>
                                 <td>
                                    {reg.rb}
                                 </td>
                                 <td>
                                    {reg.ft}
                                 </td>
                              </tr>   
                           )
                        }
                     </table>
                  </article>
               )
            }
            
         </section>
   )
}