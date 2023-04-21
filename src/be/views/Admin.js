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
import '../../css/animaciones.css'

export const Admin = () => {
   const url = 'https://apiavemaria.onrender.com/api/admin'

   const [admins, setAdmins] = useState([]);
   const [ids, setIds] = useState('');
   const [fullName, setFullName] = useState('');
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   useEffect(() => {
      getAdmins();
   }, []);

   const getAdmins = async () => {
      const res = await axios(url);
      setAdmins(res.data);
   }

   const openModal = (op, id, fullName, userName, password) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');

      setTimeout(() => {
         const fadeUp = document.querySelector('.card');
         fadeUp.classList.add('fade-Up');
      }, 100);
      
      setIds('');
      setFullName('');
      setUserName('');
      setPassword('');
      setOperation(op);

      if(op === 1) {
         setTitle('Registrar Administrador');
         setBtnSubmit('Registrar');
      }
      else if(op === 2) {
         setTitle('Editar Administrador');
         setBtnSubmit('Actualizar');
         setIds(id);
         setFullName(fullName);
         setUserName(userName);
         setPassword(password);
      }

      window.setTimeout(() => {
         document.getElementById('name').focus();
      }, 500)
   }

   const validate = async () => {
      const bcryptjs = require('bcryptjs');

      let parameters;
      const verifyPassword = document.querySelector('#verifyPassword').value;
      let passwordHash = await bcryptjs.hash(password, 8);

      let compare = bcryptjs.compareSync(verifyPassword, passwordHash);

      if(fullName.trim() === '') show_alerta('Escribe el nombre del administrador', 'warning')
      else if(userName.trim() === '') show_alerta('Escribe el nombre de usuario del administrador', 'warning')
      else if(password.trim() === '') show_alerta('Escribe la contraseña del administrador', 'warning')
      else if(verifyPassword.trim() === '') show_alerta('Escribe la verificacion de la contraseña del administrador', 'warning')
      else {
         if(compare) {
            if(operation === 1) {
               parameters = {fullName: fullName.trim(),userName:userName.trim(),password: passwordHash.trim()};
   
               const requestInit = {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(parameters)
               }
         
               fetch(url, requestInit)
               .then(res => res.text())
               .then(res => {
               
                  show_alerta('Administrador Registrado', 'success');
      
                  if(res === 'success') {
                     closeClient();
                     getAdmins();
                  }
               })
   
            } else if(operation === 2) {
               parameters = {idAdmin:ids, fullName:fullName.trim(),userName:userName.trim(),password: passwordHash.trim()};
   
               const requestInit = {
                  method: 'PUT',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(parameters)
               }
         
               fetch('https://apiavemaria.onrender.com/api/updateAdmin/' + ids, requestInit)
               .then(res => res.text())
               .then(res => {
               
                  show_alerta('Administrador Actualizado', 'success');
                  if(res === 'admin updated!') {
                     closeClient();
                     getAdmins();
                  }
               })
            }
         }else {
            show_alerta('Los campos de la contraseña no son iguales', 'warning');
         }
      }
   }

   const deleteCustomer = (id, name) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar el administrador ${name}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if(result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }
      
            fetch('https://apiavemaria.onrender.com/api/deleteAdmin/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            show_alerta('Administrador Eliminado', 'success')
            getAdmins();
         } else {
            show_alerta('El Administrador NO fue eliminado', 'info');
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
                        <th>NOMBRE COMPLETO</th>
                        <th>NOMBRE DE USUARIO</th>
                        <th>CONTRASEÑA</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     {
                        admins.map((reg) => (
                           <tr key={reg.idAdmin}>
                              <td>{reg.idAdmin}</td>
                              <td>{reg.fullName}</td>
                              <td>{reg.userName}</td>
                              <td>{reg.password}</td>
                              <td>
                                 <button onClick={() => openModal(2, reg.idAdmin, reg.fullName, reg.userName, reg.password)} className="btn btn-info">Editar</button>
                                 <button onClick={() => deleteCustomer(reg.idAdmin, reg.fullName)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>

            {/* REGISTRAR ADMINISTRADOR  */}
            <div className="container-form hide">
               <div className="card fadeUp">
                  <div className="card-header">
                     <span className='title'>{title}</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>
                  <div className="card-body">
                        <div className="mb-3">
                           <label for="name" className="form-label">Nombre Completo</label>
                           <input type="text" className="form-control" id="name" name="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                           <label for="userName" className="form-label">Nombre De Usuario</label>
                           <input type="text" className="form-control" id="userName" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                           <label for="password" className="form-label">Contraseña</label>
                           <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                           <label for="verifyPassword" className="form-label">Repetir Contraseña</label>
                           <input type="password" className="form-control" id="verifyPassword" name="verifyPassword" />
                        </div>
                        <button onClick={() => validate()} className="btn btn-primary" >{btnSubmit}</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}