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

export const Players = () => {
   const url = 'https://apiavemaria.onrender.com/api/player'

   const [players, setPlayers] = useState([]);
   const [teamList, setTeamList] = useState([]);

   const [ids, setIds] = useState('');
   const [photo, setPhoto] = useState(null);
   const [fullName, setFullName] = useState('');
   const [team, setTeam] = useState(0);
   const [jacket, setJacket] = useState(0);
   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   useEffect(() => {
      getPlayer();
   }, []);

   const getPlayer = async () => {
      const res = await axios(url);
      setPlayers(res.data);

      const reg = await axios('https://apiavemaria.onrender.com/api/team');
      setTeamList(reg.data);
   }

   const openModal = (op, id, photo, fullName, team, jacket) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');

      setTimeout(() => {
         const fadeUp = document.querySelector('.card');
         fadeUp.classList.add('fade-Up');
      }, 100);
      
      setIds('');
      setPhoto(null);
      setFullName('');
      setTeam(0);
      setJacket(0);
      setOperation(op);

      if(op === 1) {
         setTitle('Registrar Jugador');
         setBtnSubmit('Registrar');
      }
      else if(op === 2) {
         setTitle('Editar Jugador');
         setBtnSubmit('Actualizar');
         setIds(id);
         setPhoto(photo);
         setFullName(fullName);
         setTeam(team);
         setJacket(jacket);
      }

      window.setTimeout(() => {
         document.getElementById('name').focus();
      }, 500)
   }

   const validate = () => {
      let parameters;

      if(fullName.trim() === '') show_alerta('Escribe el nombre del jugador', 'warning')
      else if(team.trim() === '') show_alerta('Escribe el nombre del equipo del jugador', 'warning')
      else if(jacket.trim() === '') show_alerta('Escribe la chaqueta del jugador', 'warning')
      else {
         if(operation === 1) {
            parameters = {photo: photo.trim(), fullName: fullName.trim(),team:team.trim(),jacket: jacket.trim()};

            const requestInit = {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parameters)
            }
      
            fetch(url, requestInit)
            .then(res => res.text())
            .then(res => {
            
               show_alerta('Jugador Registrado', 'success');
   
               if(res === 'success') {
                  document.querySelector('#photo').value = null;

                  setPhoto(null);

                  closeClient();
                  getPlayer();
               }
            })

         } else if(operation === 2) {
            parameters = {idPlayer:ids, photo:photo.trim(), fullName:fullName.trim(),team:team.trim(),jacket: jacket.trim()};

            const requestInit = {
               method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parameters)
            }
      
            fetch('https://apiavemaria.onrender.com/api/updatePlayer/' + ids, requestInit)
            .then(res => res.text())
            .then(res => {
               let msj = 'Jugador Actualizado';
            
               show_alerta(msj, 'success');
   
               if(res === 'player updated!') {
                  document.querySelector('#photo').value = null;

                  setPhoto(null);

                  closeClient();
                  getPlayer();
               }
            })
         }         
      }
   }

   const deleteCustomer = (id, name) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar el jugador ${name}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if(result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }
      
            fetch('https://apiavemaria.onrender.com/api/deletePlayer/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            show_alerta('Jugador Eliminado', 'success')
            getPlayer();
         } else {
            show_alerta('El Jugador NO fue eliminado', 'info');
         }
      });
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
                        <th>FOTO</th>
                        <th>NOMBRE COMPLETO</th>
                        <th>EQUIPO</th>
                        <th># CHAQUETA</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     {
                        players.map((reg) => (
                           <tr key={reg.idPlayer}>
                              <td>{reg.idPlayer}</td>
                              <td>{<img src={`https://apiavemaria.onrender.com/${reg.photo}` } alt="imagen rota" />}</td>
                              <td>{reg.fullName}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{reg.jacket}</td>
                              <td>
                                 <button onClick={() => openModal(2, reg.idPlayer, reg.photo, reg.fullName, reg.team, reg.jacket)} className="btn btn-info">Editar</button>
                                 <button onClick={() => deleteCustomer(reg.idPlayer, reg.fullName)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>

            {/* REGISTRAR JUGADOR  */}
            <div className="container-form hide">
               <div className="card fadeUp">
                  <div className="card-header">
                     <span className='title'>{title}</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>

                  <div className="card-body">
                     <form action="https://apiavemaria.onrender.com/api/player" method="post" enctype="multipart/form-data">
                        <div className="mb-3">
                              <label for="photo" className="form-label">Foto</label>
                              <input type="file" className="form-control" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0].name)} />
                           </div>
                        <div className="mb-3">
                           <label for="name" className="form-label">Nombre Completo</label>
                           <input type="text" className="form-control" id="name" name="name" value={fullName} onChange={(e) => setFullName(e.target.value)} tabindex="1"/>
                        </div>
                        <div className="mb-3">
                           <label for="team" className="form-label">Equipo</label>
                           <select className="form-control" id="team" name="team"  onChange={(e) => setTeam(e.target.value)}>
                              <option value="">Seleccione Un Equipo</option>
                              {
                                 teamList.map((tm) => 
                                    <option key={tm.idTeam} value={tm.idTeam}>{tm.nameTeam}</option>
                                 )
                              }
                           </select>
                        </div>
                        <div className="mb-3">
                           <label for="jacket" class="form-label">Chaqueta</label>
                           <input type="number" class="form-control" id="jacket" name="jacket" value={jacket} onChange={(e) => setJacket(e.target.value)} tabindex="2" />
                        </div>
                        <button onClick={() => validate()} className="btn btn-primary" tabindex="3">{btnSubmit}</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}