import { useState } from 'react';

import { closeClient } from '../js/RegistrationForm';
import { PlayerStati } from './PlayerStati';
import { PlayerTotalStati } from './PlayerTotalStati';
import { PlayerPercentageStati } from './PlayerPercentageStati';

import '../css/leaders.css'

export const LeadersC = ({ leaderPoints, leaderAssists, leaderRebounds, leaderStoppers, leaderRobberies }) => {
   const [ids, setIds] = useState(0);
   const [namePlayer, setNamePlayer] = useState('');
   const [iconTeam, setIconTeam] = useState(null);
   const [photoPlayer, setPhotoPlayer] = useState(null);

   const openModal = async (id, namePlayer, iconTeam, photoPlayer) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');

      setTimeout(() => {
         const fadeUp = document.querySelector('.card');
         fadeUp.classList.add('fade-Up');
      }, 100);

      setIds(id);
      setNamePlayer(namePlayer);
      setIconTeam(iconTeam);
      setPhotoPlayer(photoPlayer);
   }

   return (
      <div id='leaders'>
         <h1>Lideres</h1>

         <section>
            {/* LIDERES EN PUNTOS */}
            <article>
               <table>
                  <thead>
                     <tr><th colSpan={7}>Puntos</th></tr>
                     <tr>
                        <th colSpan={3}>Jugador</th>
                        <th>Equipo</th>
                        <th>Pt</th>
                        <th>Pr</th>
                        <th>%</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        leaderPoints.map((reg, i) =>
                           <tr key={i} onClick={() => openModal(reg.player, reg.fullName, reg.iconTeam, reg.photo)}>
                              <td>{i + 1}</td>
                              <td><img src={`http://localhost:9000/${reg.photo}`} /></td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.pt}</td>
                              <td>{reg.gamePlayed}</td>
                              <td>{reg.pts}</td>
                           </tr>
                        )
                     }
                  </tbody>
               </table>
            </article>

            {/* LIDERES EN ASITENCIAS */}
            <article>
               <table>
                  <thead>
                     <tr><th colSpan={7}>Asistencias</th></tr>
                     <tr>
                        <th colSpan={3}>Jugador</th>
                        <th>Equipo</th>
                        <th>Pt</th>
                        <th>Pr</th>
                        <th>%</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        leaderAssists.map((reg, i) =>
                           <tr key={i} onClick={() => openModal(reg.player, reg.fullName, reg.iconTeam, reg.photo)}>
                              <td>{i + 1}</td>
                              <td><img src={`http://localhost:9000/${reg.photo}`} /></td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.ast}</td>
                              <td>{reg.gamePlayed}</td>
                              <td>{reg.asts}</td>
                           </tr>
                        )
                     }
                  </tbody>
               </table>
            </article>

            {/* LIDERES EN REBOTES */}
            <article>
               <table>
                  <thead>
                     <tr><th colSpan={7}>Rebotes</th></tr>
                     <tr>
                        <th colSpan={3}>Jugador</th>
                        <th>Equipo</th>
                        <th>Pt</th>
                        <th>Pr</th>
                        <th>%</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        leaderRebounds.map((reg, i) =>
                           <tr key={i} onClick={() => openModal(reg.player, reg.fullName, reg.iconTeam, reg.photo)}>
                              <td>{i + 1}</td>
                              <td><img src={`http://localhost:9000/${reg.photo}`} /></td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.rbt}</td>
                              <td>{reg.gamePlayed}</td>
                              <td>{reg.rbts}</td>
                           </tr>
                        )
                     }
                  </tbody>
               </table>
            </article>

            {/* LIDERES EN TAPONES */}
            <article>
               <table>
                  <thead>
                     <tr><th colSpan={7}>Tapones</th></tr>
                     <tr>
                        <th colSpan={3}>Jugador</th>
                        <th>Equipo</th>
                        <th>Pt</th>
                        <th>Pr</th>
                        <th>%</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        leaderStoppers.map((reg, i) =>
                           <tr key={i} onClick={() => openModal(reg.player, reg.fullName, reg.iconTeam, reg.photo)}>
                              <td>{i + 1}</td>
                              <td><img src={`http://localhost:9000/${reg.photo}`} /></td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.st}</td>
                              <td>{reg.gamePlayed}</td>
                              <td>{reg.sto}</td>
                           </tr>
                        )
                     }
                  </tbody>
               </table>
            </article>

            {/* LIDERES EN ROBOS */}
            <article>
               <table>
                  <thead>
                     <tr><th colSpan={7}>Robos</th></tr>
                     <tr>
                        <th colSpan={3}>Jugador</th>
                        <th>Equipo</th>
                        <th>Pt</th>
                        <th>Pr</th>
                        <th>%</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        leaderRobberies.map((reg, i) =>
                           <tr key={i} onClick={() => openModal(reg.player, reg.fullName, reg.iconTeam, reg.photo)}>
                              <td>{i + 1}</td>
                              <td><img src={`http://localhost:9000/${reg.photo}`} /></td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.rbo}</td>
                              <td>{reg.gamePlayed}</td>
                              <td>{reg.rbos}</td>
                           </tr>
                        )
                     }
                  </tbody>
               </table>
            </article>
         </section>

         {/* VER JUGADOR  */}
         <div className="container-form hide">
            <div className="card fadeUp">
               <div className="card-header">
                  <span className='title'>{namePlayer}</span>
                  <button className='closeClient' onClick={closeClient}>X</button>
               </div>

               <div className="card-body">
                  <div className="mb-3">
                     <div className="mb-2">
                        <img src={`http://localhost:9000/${photoPlayer}`} alt="imagen rota" />
                        <img src={`http://localhost:9000/${iconTeam}`} alt="imagen rota" />
                     </div>

                     <table>
                        <tr>
                           <td>Juego</td><td>Pt</td><td>As</td><td>Rb</td><td>Tp</td><td>Rbs</td><td>Fat</td>
                        </tr>
                        {
                           <PlayerStati
                              idPlayer={ids}
                           />
                        }
                        {
                           <PlayerTotalStati
                              idPlayer={ids}
                           />
                        }
                        {
                           <PlayerPercentageStati
                              idPlayer={ids}
                           />
                        }
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}