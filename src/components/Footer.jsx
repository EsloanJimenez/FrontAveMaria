import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import '../css/footer.css'
import { faEye } from "@fortawesome/free-solid-svg-icons"

export const Footer = ({visitCounter}) => {
   return(
      <div className="footer">
         <ul>
            <li><FontAwesomeIcon icon={faInstagram} /><a target="_blank" href="https://www.instagram.com/motivofotodigital/">Motivo Foto Digital</a></li>
            <li><FontAwesomeIcon icon={faInstagram} /><a target="_blank" href="https://www.instagram.com/estrellas_del_salome_urena/">Estrellas Del Salome Ureña</a></li>
            <li><FontAwesomeIcon icon={faInstagram} /><a target="_blank" href="https://www.instagram.com/estadisticas_torneo_baloncesto/">Estadisticas Torneo De Baloncesto</a></li>
            <li><FontAwesomeIcon icon={faEye} /><span>{visitCounter+1}</span></li>
         </ul>
      </div>
   )
}