import { useState, useRef, useEffect } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

import { HeaderControler } from "../components/HeaderControler"
import { Board } from "../components/Board"
import { closeClient, closeSelectGame } from '../../js/RegistrationForm'
import { show_alerta } from '../../js/Function'

import '../css/register.css'
import '../css/buttons.css'

export const StatisticsPerGame = () => {
   const url = 'http://localhost:9000/api/'
   const urlOp = 'http://localhost:9000/api/operationStatisti/';                                   

   const [team1, setTeam1] = useState([]);
   const [team2, setTeam2] = useState([]);

   const [nameGameList, setNameGameList] = useState([]);
   const [nameTeamList, setNameTeamList] = useState([]);
   const [namePlayerList, setNamePlayerList] = useState([]);

   const [ptTeam1, setPtTeam1] = useState([]);
   const [ptTeam2, setPtTeam2] = useState([]);

   const [nameGame, setNameGame] = useState();
   const [nameTeam, setNameTeam] = useState(0);
   const [namePlayer, setNamePlayer] = useState(0);

   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   const refFundPlayer = useRef();
   const refFadeUp = useRef();

   let parameters, parametersTeam, ptT1, ptT2;

   useEffect(() => {
      getStatisticsPerPlayer();
      getScore();
      
      setInterval(() => {
         getStatisticsPerPlayer();
         getScore();
      }, 10000)
   }, []);

   const getStatisticsPerPlayer = async () => {
      const cal = await axios(`${url}filterCalendar`);
      setNameGameList(cal.data);
      
      const tem1 = await axios(`${url}statisticsTeam1/${cal.data[0].idCalendar}/${cal.data[0].team1}`);
      setTeam1(tem1.data);

      const tem2 = await axios(`${url}statisticsTeam2/${cal.data[0].idCalendar}/${cal.data[0].team2}`);
      setTeam2(tem2.data);

      const tm = await axios(`${url}team`);
      setNameTeamList(tm.data);

      const pl = await axios(`${url}player`);
      setNamePlayerList(pl.data);
   }
   
   const getScore = async () => {
      const cal = await axios(`${url}filterCalendar`);
      setNameGameList(cal.data);
      
      const viewScoreTeam1 = await axios(`${url}scoreTeam1/${cal.data[0].idCalendar}/${cal.data[0].team1}`);
      setPtTeam1(viewScoreTeam1.data);

      const viewScoreTeam2 = await axios(`${url}scoreTeam2/${cal.data[0].idCalendar}/${cal.data[0].team2}`);
      setPtTeam2(viewScoreTeam2.data);

      ptT1 = viewScoreTeam1.data[0].pt;
      ptT2 = viewScoreTeam2.data[0].pt;

      parametersTeam = {idCalendar: cal.data[0].idCalendar, pointsTeam1: ptT1, pointsTeam2: ptT2};

      fetch(`${url}updateCalendar/${cal.data[0].idCalendar}`, {
         method: 'PUT',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(parametersTeam)
      }).then(res => res.text())
   }

   const openModal = (op) => {
      setNameTeam(0);
      setNamePlayer(0);
      setOperation(op);

      if(op === 1) {
         refFundPlayer.current.classList.remove('hide_font');
      
         setTimeout(() => {
            refFadeUp.current.classList.add('fade-Up');
         }, 100);

         setTitle('Registrar Jugador Al Partido');
         setBtnSubmit('Registrar');
      }
   }

   const validate = () => {
      if(nameGame === "0") show_alerta('Seleccione el partido', 'warning')
      else if(nameTeam === 0) show_alerta('Seleccione el equipo', 'warning')
      else if(namePlayer === 0) show_alerta('Seleccione el jugador', 'warning')
      else {
         if(operation === 1) {
            parameters = {game: nameGame, team: nameTeam, player: namePlayer};

            const requestInit = {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parameters)
            }
      
            fetch(`${url}statisticsPerPlayer`, requestInit)
            .then(res => res.text())
            .then(res => {
               let msj = 'Jugador Registrado En El Partido';
            
               show_alerta(msj, 'success');
   
               if(res === 'success') {
                  closeClient();
                  getStatisticsPerPlayer();
               }
            })

         }      
      }
   }

   const deleteCustomer = (idPlayer, idGame) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar el juego ${nameGame}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if(result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }
      
            fetch('http://localhost:9000/api/deleteStatisticsPerPlayer/' + idPlayer, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            show_alerta('Juego Eliminado', 'success')
            getStatisticsPerPlayer();
         } else {
            show_alerta('El Juego NO fue eliminado', 'info');
         }
      });
   }

   const opPtTeam1 = async (player, op) => {
      if(op) {
         player.points +=1;

         parameters = {idStatistic: player.idStatistic, points: player.points};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
            .then(res => {
               getScore();
            });
      } else {
         player.points -=1;
         
         parameters = {idStatistic: player.idStatistic, points: player.points};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
            .then(res => {
               getScore();
            })
      }
   }

   const opAsTeam1 = (player, op) => {
      if(op) {
         player.assists +=1;
   
         parameters = {idStatistic: player.idStatistic, assists: player.assists};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
            .then(res => {
               getScore();
            })
      } else {
         player.assists -=1;
         
         parameters = {idStatistic: player.idStatistic, assists: player.assists};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   const opRebTeam1 = (player, op) => {
      if(op) {
         player.rebounds +=1;
   
         parameters = {idStatistic: player.idStatistic, rebounds: player.rebounds};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      } else {
         player.rebounds -=1;
         
         parameters = {idStatistic: player.idStatistic, rebounds: player.rebounds};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   const opStoTeam1 = (player, op) => {
      if(op) {
         player.stoppers +=1;
   
         parameters = {idStatistic: player.idStatistic, stoppers: player.stoppers};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      } else {
         player.stoppers -=1;
         
         parameters = {idStatistic: player.idStatistic, stoppers: player.stoppers};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   const opRobTeam1 = (player, op) => {   
      if(op) {
         player.robberies +=1;
   
         parameters = {idStatistic: player.idStatistic, robberies: player.robberies};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      } else {
         player.robberies -=1;
         
         parameters = {idStatistic: player.idStatistic, robberies: player.robberies};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   const opFauTeam1 = (player, op) => {   
      if(op) {
         player.faults +=1;
   
         parameters = {idStatistic: player.idStatistic, faults: player.faults};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      } else {
         player.faults -=1;
         
         parameters = {idStatistic: player.idStatistic, faults: player.faults};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   const opPtTeam2 = (player, op) => {
      if(op) {
         player.points +=1;
   
         parameters = {idStatistic: player.idStatistic, points: player.points};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      } else {
         player.points -=1;
         
         parameters = {idStatistic: player.idStatistic, points: player.points};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   const opAsTeam2 = (player, op) => {
      if(op) {
         player.assists +=1;
   
         parameters = {idStatistic: player.idStatistic, assists: player.assists};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      } else {
         player.assists -=1;
         
         parameters = {idStatistic: player.idStatistic, assists: player.assists};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   const opRebTeam2 = (player, op) => {
      if(op) {
         player.rebounds +=1;
   
         parameters = {idStatistic: player.idStatistic, rebounds: player.rebounds};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      } else {
         player.rebounds -=1;
         
         parameters = {idStatistic: player.idStatistic, rebounds: player.rebounds};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   const opStoTeam2 = (player, op) => {
      if(op) {
         player.stoppers +=1;
   
         parameters = {idStatistic: player.idStatistic, stoppers: player.stoppers};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      } else {
         player.stoppers -=1;
         
         parameters = {idStatistic: player.idStatistic, stoppers: player.stoppers};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   const opRobTeam2 = (player, op) => {   
      if(op) {
         player.robberies +=1;
   
         parameters = {idStatistic: player.idStatistic, robberies: player.robberies};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      } else {
         player.robberies -=1;
         
         parameters = {idStatistic: player.idStatistic, robberies: player.robberies};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   const opFauTeam2 = (player, op) => {   
      if(op) {
         player.faults +=1;
   
         parameters = {idStatistic: player.idStatistic, faults: player.faults};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      } else {
         player.faults -=1;
         
         parameters = {idStatistic: player.idStatistic, faults: player.faults};
               
         fetch(urlOp + player.idStatistic, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
         .then(res => {
            getScore();
         })
      }
   }

   return(
      <>
      <div>
         <HeaderControler />
         
         <Board 
            ptTeam1={ptTeam1}
            ptTeam2={ptTeam2}
         />

         <div className="container-table">
            <div className='header'>
               <button name="newClient" className="btn-light btn-register" onClick={() => openModal(1)}><span><FontAwesomeIcon icon={faCirclePlus} /></span></button>
            </div>

            <h1>EQUIPO A ({ptTeam1.map(reg => reg.nameTeam)})</h1>
      
            <div className='table statist'>
               <table>
                  <thead>
                     <tr>
                        <th>FOTO</th>
                        <th>NOMBRE</th>
                        <th>CHAQUETA</th>
                        <th>PUNTOS</th>
                        <th>ASISTENCIAS</th>
                        <th>REBOTES</th>
                        <th>TAPONES</th>
                        <th>ROBOS</th>
                        <th>FALTAS</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     {
                        team1.map((reg, index) => (
                           <tr key={reg.idStatistic}>
                              <td>{<img className="imgStatist" src={`http://localhost:9000/${reg.photo}` } alt="imagen rota" />}</td>
                              <td>{reg.fullName}</td>
                              <td>{reg.jacket}</td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=> opPtTeam1(reg, false)}>-</button>
                                 {reg.points}
                                 <button type="button" className="btn btn-info" onClick={()=> opPtTeam1(reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=> opAsTeam1(reg, false)}>-</button>
                                 {reg.assists}
                                 <button type="button" className="btn btn-info" onClick={()=> opAsTeam1(reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=> opRebTeam1(reg, false)}>-</button>
                                 {reg.rebounds}
                                 <button type="button" className="btn btn-info" onClick={()=> opRebTeam1(reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=> opStoTeam1(reg, false)}>-</button>
                                 {reg.stoppers}
                                 <button type="button" className="btn btn-info" onClick={()=> opStoTeam1(reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=> opRobTeam1(reg, false)}>-</button>
                                 {reg.robberies}
                                 <button type="button" className="btn btn-info" onClick={()=> opRobTeam1(reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=> opFauTeam1(reg, false)}>-</button>
                                 {reg.faults}
                                 <button type="button" className="btn btn-info" onClick={()=> opFauTeam1(reg, true)}>+</button>
                              </td>
                              <td>
                                 <button onClick={() => deleteCustomer(reg.idStatistic, reg.game)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>

            <h1>EQUIPO B ({ptTeam2.map(reg => reg.nameTeam)})</h1>
      
            <div className='table statist'>
               <table>
                  <thead>
                     <tr>
                        <th>FOTO</th>
                        <th>NOMBRE</th>
                        <th>CHAQUETA</th>
                        <th>PUNTOS</th>
                        <th>ASISTENCIAS</th>
                        <th>REBOTES</th>
                        <th>TAPONES</th>
                        <th>ROBOS</th>
                        <th>FALTAS</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     {
                        team2.map((reg,index) => (
                           <tr key={reg.idStatistic}>
                              <td>{<img className="imgStatist" src={`http://localhost:9000/${reg.photo}` } alt="imagen rota" />}</td>
                              <td>{reg.fullName}</td>
                              <td>{reg.jacket}</td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=>opPtTeam2(index,reg, false)}>-</button>
                                 {reg.points}
                                 <button type="button" className="btn btn-info" onClick={()=>opPtTeam2(index,reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=>opAsTeam2(index,reg, false)}>-</button>
                                 {reg.assists}
                                 <button type="button" className="btn btn-info" onClick={()=>opAsTeam2(index,reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=>opRebTeam2(index,reg, false)}>-</button>
                                 {reg.rebounds}
                                 <button type="button" className="btn btn-info" onClick={()=>opRebTeam2(index,reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=>opStoTeam2(index,reg, false)}>-</button>
                                 {reg.stoppers}
                                 <button type="button" className="btn btn-info" onClick={()=>opStoTeam2(index,reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=>opRobTeam2(index,reg, false)}>-</button>
                                 {reg.robberies}
                                 <button type="button" className="btn btn-info" onClick={()=>opRobTeam2(index,reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=>opFauTeam2(index,reg, false)}>-</button>
                                 {reg.faults}
                                 <button type="button" className="btn btn-info" onClick={()=>opFauTeam2(index,reg, true)}>+</button>
                              </td>
                              <td>
                                 <button onClick={() => deleteCustomer(reg.idStatistic)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>

            {/* REGISTRAR JUGADOR AL JUEGO  */}
            <div className="container-form hide hide_font" ref={refFundPlayer}>
               <div className="card fadeUp" ref={refFadeUp}>
                  <div className="card-header">
                     <span className='title'>{title}</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>

                  <div className="card-body">
                     <div className="mb-3">
                        <label htmlFor="nameGame" className="form-label">Seleccione Partido</label>
                        <select className="form-control" id="nameGame" name="nameGame" onChange={(e) => setNameGame(e.target.value)}>
                           <option value="0">Seleccione El Partido</option>
                           {
                              nameGameList.map((gameList) =>
                                 <option key={gameList.idCalendar} value={gameList.idCalendar}>{gameList.nameGame}</option>
                              )
                           }
                        </select>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="nameTeam" className="form-label">Equipo</label>
                        <select className="form-control" id="nameTeam" name="nameTeam" onChange={(e) => setNameTeam(e.target.value)}>
                           <option value="0">Seleccione El Equipo</option>
                           {
                              nameTeamList.map((teamList) =>
                                 <option key={teamList.idTeam} value={teamList.idTeam}>{teamList.nameTeam}</option>
                              )
                           }
                        </select>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="namePlayer" className="form-label">Jugador</label>
                        <select className="form-control" id="namePlayer" name="namePlayer" onChange={(e) => setNamePlayer(e.target.value)}>
                           <option value="0">Seleccione El Jugador</option>
                           {
                              namePlayerList.map((playerList) =>
                                 <option key={playerList.idPlayer} value={playerList.idPlayer}>{playerList.fullName} ({playerList.jacket}) ({playerList.nameTeam})</option>
                              )
                           }
                        </select>
                     </div>
                     <button onClick={() => validate()} className="btn btn-primary" >{btnSubmit}</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </>
   )
}