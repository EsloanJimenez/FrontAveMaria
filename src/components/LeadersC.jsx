import { useEffect, useState } from 'react';
import axios from 'axios';

import '../css/leaders.css'

import { closeClient } from '../js/RegistrationForm';

export const LeadersC = ({leaderPoints, leaderAssists, leaderRebounds, leaderStoppers, leaderRobberies}) => {
   const url = 'http://localhost:9000/api/';

   const [viewPlayer, setViewPlayer] = useState([]);

   const [ids, setIds] = useState('');
   const [namePlayer, setNamePlayer] = useState('');
   const [iconTeam, setIconTeam] = useState(null);
   const [photoPlayer, setPhotoPlayer] = useState(null);
   const [pt, setPt] = useState('');
   const [pts, setPts] = useState('');
   const [ast, setAst] = useState('');
   const [asts, setAsts] = useState('');
   const [rbt, setRbt] = useState('');
   const [rbts, setRbts] = useState('');
   const [st, setSt] = useState('');
   const [sto, setSto] = useState('');
   const [rbo, setRbo] = useState('');
   const [rbos, setRbos] = useState('');
   const [ft, setFt] = useState('');
   const [fts, setFts] = useState('');

   useEffect(() => {
      getViewPlayer();
   }, []);

   const getViewPlayer = async (id) => {
      const vp = await axios(`${url}statiPlayer/${id}`);
      setViewPlayer(vp.data);
   }

   const openModal = async (id, namePlayer, iconTeam, photoPlayer, pt, pts, ast, asts, rbt, rbts, st, sto, rbo, rbos, ft, fts) => {
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
      setPt(pt);
      setPts(pts);
      setAst(ast);
      setAsts(asts);
      setRbt(rbt);
      setRbts(rbts);
      setSt(st);
      setSto(sto);
      setRbo(rbo);
      setRbos(rbos);
      setFt(ft);
      setFts(fts);
   }
   
   return(
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
                           <tr onClick={() => openModal(reg.idPlayer, reg.fullName, reg.iconTeam, reg.photo, reg.pt, reg.pts, reg.ast, reg.asts, reg.rbt, reg.rbts, reg.st, reg.sto, reg.rbo, reg.rbos, reg.ft, reg.fts)}>
                              <td>{i+1}</td>
                              <td><img src={`http://localhost:9000/${reg.photo}`} /></td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.pt}</td>
                              <td>1</td>
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
                           <tr onClick={() => openModal(reg.idPlayer, reg.fullName, reg.iconTeam, reg.photo, reg.pt, reg.pts, reg.ast, reg.asts, reg.rbt, reg.rbts, reg.st, reg.sto, reg.rbo, reg.rbos, reg.ft, reg.fts)}>
                              <td>{i+1}</td>
                              <td><img src={`http://localhost:9000/${reg.photo}`} /></td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.ast}</td>
                              <td>1</td>
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
                           <tr onClick={() => openModal(reg.idPlayer, reg.fullName, reg.iconTeam, reg.photo, reg.pt, reg.pts, reg.ast, reg.asts, reg.rbt, reg.rbts, reg.st, reg.sto, reg.rbo, reg.rbos, reg.ft, reg.fts)}>
                              <td>{i+1}</td>
                              <td><img src={`http://localhost:9000/${reg.photo}`} /></td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.rbt}</td>
                              <td>1</td>
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
                           <tr onClick={() => openModal(reg.idPlayer, reg.fullName, reg.iconTeam, reg.photo, reg.pt, reg.pts, reg.ast, reg.asts, reg.rbt, reg.rbts, reg.st, reg.sto, reg.rbo, reg.rbos, reg.ft, reg.fts)}>
                              <td>{i+1}</td>
                              <td><img src={`http://localhost:9000/${reg.photo}`} /></td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.st}</td>
                              <td>1</td>
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
                           <tr onClick={() => openModal(reg.idPlayer, reg.fullName, reg.iconTeam, reg.photo, reg.pt, reg.pts, reg.ast, reg.asts, reg.rbt, reg.rbts, reg.st, reg.sto, reg.rbo, reg.rbos, reg.ft, reg.fts)}>
                              <td>{i+1}</td>
                              <td><img src={`http://localhost:9000/${reg.photo}`} /></td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.rbo}</td>
                              <td>1</td>
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
                           <tr>
                              <td>1</td>
                              <td>{pt}</td>
                              <td>{ast}</td>
                              <td>{rbt}</td>
                              <td>{st}</td>
                              <td>{rbo}</td>
                              <td>{ft}</td>
                           </tr>
                           <tr>
                              <td>%</td>
                              <td>{pts}</td>
                              <td>{asts}</td>
                              <td>{rbts}</td>
                              <td>{sto}</td>
                              <td>{rbos}</td>
                              <td>{fts}</td>
                           </tr>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}