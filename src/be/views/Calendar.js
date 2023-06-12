import { useState, useEffect } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

import { HeaderControler } from "../components/HeaderControler"
import { closeClient } from '../../js/RegistrationForm'
import { show_alerta } from '../../js/Function'

import '../css/register.css'
import '../css/buttons.css'

export const Calendar = () => {
   let parameters;

   const url = 'https://apiavemaria.onrender.com/api/calendar';
   const urlOp = 'https://apiavemaria.onrender.com/api/updateCalendar/';

   const [calendar, setCalendar] = useState([]);
   const [ids, setIds] = useState('');
   const [nameGame, setNameGame] = useState('');
   const [gameDate, setGameDate] = useState('');
   const [teamList, setTeamList] = useState([]);
   const [team1, setTeam1] = useState(0);
   const [team2, setTeam2] = useState(0);
   const [photoTeam1, setPhotoTeam1] = useState(null);
   const [photoTeam2, setPhotoTeam2] = useState(null);
   const [status, setStatus] = useState(0);
   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   useEffect(() => {
      getCalendar();
   }, []);

   const getCalendar = async () => {
      const res = await axios.get(url);
      setCalendar(res.data);
      
      const reg = await axios.get('https://apiavemaria.onrender.com/api/team');
      setTeamList(reg.data);
   }

   const openModal = async (op, id, nameGame, gameDate, team1, team2, photoTeam1, photoTeam2, status) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');
      
      setTimeout(() => {
         const fadeUp = document.querySelector('.card');
         fadeUp.classList.add('fade-Up');
      }, 100);
      
      setIds('');
      setNameGame('');
      setGameDate('');
      setTeam1(0);
      setTeam2(0);
      setPhotoTeam1(null);
      setPhotoTeam2(null);
      setStatus('');
      setOperation(op);

      if(op === 1) {
         setTitle('Registrar Calendario');
         setBtnSubmit('Registrar');
      }
      else if(op === 2) {
         setTitle('Editar Calendario');
         setBtnSubmit('Actualizar');
         setIds(id);
         setNameGame(nameGame);
         setGameDate(gameDate);
         setTeam1(team1);
         setTeam2(team2);
         setPhotoTeam1(photoTeam1);
         setPhotoTeam2(photoTeam2);
         setStatus(status);
      }
   }

   const validate = () => {
      let parameters;

      if(gameDate.trim() === "") show_alerta('Coloque la fecha del juego', 'warning')
      if(nameGame.trim() === "") show_alerta('Escriba el nombre del partido', 'warning')
      else {
         if(operation === 1) {
            parameters = {nameGame: nameGame.trim(), gameDate: gameDate.trim(), team1: team1.trim(), team2:team2.trim(), photoTeam1: photoTeam1.trim(), photoTeam2: photoTeam2.trim(), status: status};

            const requestInit = {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parameters)
            }
      
            fetch(url, requestInit)
            .then(res => res.text())
            .then(res => {
               let msj = 'Calendario Registrado';
            
               show_alerta(msj, 'success');
   
               if(res === 'success') {
                  document.querySelector('#photoTeam1').value = null;
                  document.querySelector('#photoTeam2').value = null;

                  setPhotoTeam1(null);
                  setPhotoTeam2(null);

                  closeClient();
                  getCalendar();
               }
            })

         } else if(operation === 2) {
            parameters = {idCalendar:ids, nameGame: nameGame, gameDate:gameDate, team1:team1,team2:team2, photoTeam1: photoTeam1, photoTeam2: photoTeam2,status: status};

            const requestInit = {
               method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parameters)
            }
      
            fetch('https://apiavemaria.onrender.com/api/updateCalendar/' + ids, requestInit)
            .then(res => res.text())
            .then(res => {
               let msj = 'Calendario Actualizado';
            
               show_alerta(msj, 'success');

               if(res === 'calendar updated!') {
                  document.querySelector('#photoTeam1').value = null;
                  document.querySelector('#photoTeam2').value = null;

                  setPhotoTeam1(null);
                  setPhotoTeam2(null);

                  closeClient();
                  getCalendar();
               }
            })
         }         
      }
   }

   const deleteCustomer = (id) => {
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
      
            fetch('https://apiavemaria.onrender.com/api/deleteCalendar/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            show_alerta('juego Eliminado', 'success')
            getCalendar();
         } else {
            show_alerta('El juego NO fue eliminado', 'info');
         }
      });
   }

   const gameStatus = (index, player, op) => {
      if(op) {
         player.status +=1;
         const newArr = [...calendar];
         newArr[index] = player;
         setCalendar(newArr);

         parameters = {idCalendar: player.idCalendar, status: player.status};
               
         fetch(urlOp + player.idCalendar, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
      } else {
         player.status -=1;
         const newArr = [...calendar];
         newArr[index] = player;
         setCalendar(newArr);
         
         parameters = {idCalendar: player.idCalendar, status: player.status};
               
         fetch(urlOp + player.idCalendar, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
      }
   }

   const gameRoom = (index, player, op) => {
      if(op) {
         player.room +=1;
         const newArr = [...calendar];
         newArr[index] = player;
         setCalendar(newArr);

         parameters = {idCalendar: player.idCalendar, room: player.room};
               
         fetch(urlOp + player.idCalendar, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
      } else {
         player.room -=1;
         const newArr = [...calendar];
         newArr[index] = player;
         setCalendar(newArr);
         
         parameters = {idCalendar: player.idCalendar, room: player.room};
               
         fetch(urlOp + player.idCalendar, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
      }
   }

   return(
      <div>
         <HeaderControler />

         <div className="container-table">
            <div className='header'>
               <button name="newClient" className="btn-light btn-register" onClick={() => openModal(1)}><span><FontAwesomeIcon icon={faCirclePlus} /></span></button>
            </div>

            <div className='table'>
               <table>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>NOMBRE PARTIDO</th>
                        <th>EQUIPO 1</th>
                        <th>PHOTO EQUIPO 1</th>
                        <th>FECHA</th>
                        <th>CUARTO</th>
                        <th>TIEMPO</th>
                        <th>EQUIPO 2</th>
                        <th>PHOTO EQUIPO 2</th>
                        <th>STATUS</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     {
                        calendar.map((reg, index) => (
                           <tr key={index}>
                              <td>{reg.idCalendar}</td>
                              <td>{reg.nameGame}</td>
                              <td>{reg.team1}</td>
                              <td>{<img src={`https://apiavemaria.onrender.com/${reg.photoTeam1}` } alt="imagen rota" />}</td>
                              <td>{reg.date}</td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=> gameRoom(index, reg, false)}>-</button>
                                 {reg.room}
                                 <button type="button" className="btn btn-info" onClick={()=> gameRoom(index, reg, true)}>+</button>
                              </td>
                              <td>{reg.time}</td>
                              <td>{reg.team2}</td>
                              <td>{<img src={`https://apiavemaria.onrender.com/${reg.photoTeam2}` } alt="imagen rota" />}</td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=> gameStatus(index, reg, false)}>-</button>
                                 {reg.status}
                                 <button type="button" className="btn btn-info" onClick={()=> gameStatus(index, reg, true)}>+</button>
                              </td>
                              <td>
                                 <button onClick={() => openModal(2, reg.idCalendar, reg.nameGame, reg.gameDate, reg.team1, reg.team2, reg.photoTeam1, reg.photoTeam2, reg.status)} className="btn btn-info">Editar</button>
                                 <button onClick={() => deleteCustomer(reg.idCalendar)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>

            {/* REGISTRAR CALENDARIO  */}
            <div className="container-form hide hide_font">
               <div className="card fadeUp">
                  <div className="card-header">
                     <span className='title'>{title}</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>

                  <div className="card-body">
                     <div className="mb-3">
                        <label for="gameDate" className="form-label">Fecha</label>
                        <input type="date" className="form-control" id="gameDate" name="gameDate" value={gameDate} onChange={(e) => setGameDate(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="nameGame" className="form-label">Nombre Partido</label>
                        <input type="text" className="form-control" id="nameGame" name="nameGame" value={nameGame} onChange={(e) => setNameGame(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="team1" className="form-label">Equipo 1</label>
                        <select className="form-control" id="team1" name="team1"  onChange={(e) => setTeam1(e.target.value)}>
                           {
                              teamList.map((tm) => 
                                 <option key={tm.idTeam} value={tm.idTeam}>{tm.nameTeam}</option>
                              )
                           }
                        </select>
                     </div>
                     <div className="mb-3">
                        <label for="photoTeam1" className="form-label">Foto Equipo 1</label>
                        <input type="file" className="form-control" id="photoTeam1" name="photoTeam1" onChange={(e) => setPhotoTeam1(e.target.files[0].name)} />
                     </div>
                     <div className="mb-3">
                        <label for="team2" className="form-label">Equipo 2</label>
                        <select className="form-control" id="team2" name="team2"  onChange={(e) => setTeam2(e.target.value)}>
                           {
                              teamList.map((tm) => 
                                 <option key={tm.idTeam} value={tm.idTeam}>{tm.nameTeam}</option>
                              )
                           }
                        </select>
                     </div>
                     <div className="mb-3">
                        <label for="photoTeam2" className="form-label">Foto Equipo 2</label>
                        <input type="file" className="form-control" id="photoTeam2" name="photoTeam2" onChange={(e) => setPhotoTeam2(e.target.files[0].name)} />
                     </div>
                     <div className="mb-3">
                        <label for="status" className="form-label">Status</label>
                        <select className="form-control" id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                           <option value="0">No ha iniciado</option>
                           <option value="1">Inicio</option>
                           <option value="2">Finalizo</option>
                        </select>
                     </div>
                     <button onClick={() => validate()} className="btn btn-primary" >{btnSubmit}</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}