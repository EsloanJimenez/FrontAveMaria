import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import '../css/footer.css'
import { faEye } from "@fortawesome/free-solid-svg-icons"

export const Footer = () => {
   return(
      <div className="footer">
         <ul>
            <li><FontAwesomeIcon icon={faInstagram} /><a target="_blank" href="https://www.instagram.com/motivofotodigital/">Motivo Foto Digital</a></li>
            <li><FontAwesomeIcon icon={faInstagram} /><a target="_blank" href="https://www.instagram.com/estrellas_del_salome_urena/">Estrellas Del Salome Ureña</a></li>
            {/* <li><FontAwesomeIcon icon={faEye} /><span>{console.log(visitCounter)}</span></li> */}
            {/* <li><FontAwesomeIcon icon={faEye} /><span>{visitCounter.map(reg => reg.visit)}</span></li> */}
         </ul>
      </div>
   )
}