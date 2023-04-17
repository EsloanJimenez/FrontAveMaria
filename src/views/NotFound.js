import React from "react";
import NotFoundPage from '../images/icon/404.png'
import '../css/NotFoundPage.css'

const NotFound = () => {
   return(
      <div className="notFoundPage">
         <img src={NotFoundPage} title="Pagina no encontrada"/>
      </div>
   )
}

export default NotFound