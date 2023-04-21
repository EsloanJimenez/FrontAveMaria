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

export const Teams = () => {
   let parameters;
   
   const url = 'https://apiavemaria.onrender.com/api/team';
   const urlOp = 'https://apiavemaria.onrender.com/api/updateTeam/';

   const [teams, setTeams] = useState([]);
   const [ids, setIds] = useState('');
   const [name, setName] = useState('');
   const [photo, setPhoto] = useState(null);
   const [logo, setLogo] = useState(null);
   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   useEffect(() => {
      getTeams();
   }, []);

   const getTeams = async () => {
      const res = await axios(url);
      setTeams(res.data);
   }

   const openModal = (op, id, name, photo, logo) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');

      setTimeout(() => {
         const fadeUp = document.querySelector('.card');
         fadeUp.classList.add('fade-Up');
      }, 100);
      
      setIds('');
      setName('');
      setPhoto(null);
      setLogo(null);
      setOperation(op);

      if(op === 1) {
         setTitle('Registrar Equipo');
         setBtnSubmit('Registrar');
      }
      else if(op === 2) {
         setTitle('Editar Equipo');
         setBtnSubmit('Actualizar');
         setIds(id);
         setName(name);
         setPhoto(photo);
         setLogo(logo);
      }

      window.setTimeout(() => {
         document.getElementById('name').focus();
      }, 500)
   }

   const validate = () => {
      let parameters;

      if(name.trim() === '') show_alerta('Escribe el nombre del equipo', 'warning')
      else {
         if(operation === 1) {
            parameters = {nameTeam: name.trim(),photoTeam: photo.trim(), iconTeam: logo.trim()};

            const requestInit = {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parameters)
            }
      
            fetch(url, requestInit)
            .then(res => res.text())
            .then(res => {
               let msj = 'Equipo Registrado';
               
               show_alerta(msj, 'success');
   
               if(res === 'success') {
                  document.querySelector('#photo').value = null;
                  document.querySelector('#logo').value = null;

                  setPhoto(null);
                  setLogo(null);

                  closeClient();
                  getTeams();
               }
            })

         } else if(operation === 2) {
            parameters = {idTeam:ids, nameTeam:name.trim(),photoTeam:photo.trim(),iconTeam: logo.trim()};

            const requestInit = {
               method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parameters)
            }
      
            fetch(urlOp + ids, requestInit)
            .then(res => res.text())
            .then(res => {
               let msj = 'Equipo Actualizado';
            
               show_alerta(msj, 'success');
   
               if(res === 'Team updated!') {
                  document.querySelector('#photo').value = null;
                  document.querySelector('#logo').value = null;

                  setPhoto(null);
                  setLogo(null);

                  closeClient();
                  getTeams();
               }
            })
         }         
      }
   }

   const deleteCustomer = (id) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar el equipo ${name}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if(result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }
      
            fetch('https://apiavemaria.onrender.com/api/deleteTeam/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            show_alerta('Equipo Eliminado', 'success')
            getTeams();
         } else {
            show_alerta('El Equipo NO fue eliminado', 'info');
         }
      });
   }

   const gameWon = (index, player, op) => {
      if(op) {
         player.gameWon +=1;
         const newArr = [...teams];
         newArr[index] = player;
         setTeams(newArr);

         parameters = {idTeam: player.idTeam, gameWon: player.gameWon};
               
         fetch(urlOp + player.idTeam, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
      } else {
         player.gameWon -=1;
         const newArr = [...teams];
         newArr[index] = player;
         setTeams(newArr);
         
         parameters = {idTeam: player.idTeam, gameWon: player.gameWon};
               
         fetch(urlOp + player.idTeam, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
      }
   }

   const gameLost = (index, player, op) => {
      if(op) {
         player.gameLost +=1;
         const newArr = [...teams];
         newArr[index] = player;
         setTeams(newArr);

         parameters = {idTeam: player.idTeam, gameLost: player.gameLost};
               
         fetch(urlOp + player.idTeam, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(parameters)
         }).then(res => res.text())
      } else {
         player.gameLost -=1;
         const newArr = [...teams];
         newArr[index] = player;
         setTeams(newArr);
         
         parameters = {idTeam: player.idTeam, gameLost: player.gameLost};
               
         fetch(urlOp + player.idTeam, {
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
                        <th>NOMBRE</th>
                        <th>Foto Equipo</th>
                        <th>Logo</th>
                        <th>Juegos Ganados</th>
                        <th>Juegos Perdidos</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     {
                        teams.map((reg, index) => (
                           <tr key={reg.idTeam}>
                              <td>{reg.idTeam}</td>
                              <td>{reg.nameTeam}</td>
                              <td>{<img src={`https://apiavemaria.onrender.com/${reg.photoTeam}` } alt="imagen rota" />}</td>
                              <td>{<img src={`https://apiavemaria.onrender.com/${reg.iconTeam}` } alt="imagen rota" />}</td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=> gameWon(index, reg, false)}>-</button>
                                 {reg.gameWon}
                                 <button type="button" className="btn btn-info" onClick={()=> gameWon(index, reg, true)}>+</button>
                              </td>
                              <td>
                                 <button type="button" className="btn btn-delete" onClick={()=> gameLost(index, reg, false)}>-</button>
                                 {reg.gameLost}
                                 <button type="button" className="btn btn-info" onClick={()=> gameLost(index, reg, true)}>+</button>
                              </td>
                              <td>
                                 <button onClick={() => openModal(2, reg.idTeam, reg.nameTeam, reg.photoTeam, reg.iconTeam)} className="btn btn-info">Editar</button>
                                 <button onClick={() => deleteCustomer(reg.idTeam)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                           
                        ))
                     }
                  </tbody>
               </table>
            </div>

            {/* REGISTRAR EQUIPO  */}
            <div className="container-form hide hide_font">
               <div className="card fadeUp">
                  <div className="card-header">
                     <span className='title'>{title}</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>
                  <div className="card-body">
                     <form action="https://apiavemaria.onrender.com/api/team" method="post" enctype="multipart/form-data">
                        <div className="mb-3">
                           <label for="name" className="form-label">Nombre</label>
                           <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                           <label for="photo" className="form-label">Foto</label>
                           <input type="file" className="form-control" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0].name)} />
                        </div>
                        <div className="mb-3">
                           <label for="logo" className="form-label">Logo</label>
                           <input type="file" className="form-control" id="logo" name="logo" onChange={(e) => setLogo(e.target.files[0].name)} />
                        </div>
                        <button onClick={() => validate()} className="btn btn-primary" >{btnSubmit}</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}