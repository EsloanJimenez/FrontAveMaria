import { useEffect, useState } from "react";
import axios from 'axios';

export const PlayerTotalStati = ({idPlayer}) => {
   const [playerTotalStati, setPlayerTotalStati] = useState([]);

   useEffect(() => {
      getPlayerStati();
   }, [idPlayer])

   const getPlayerStati = async() => {
      const totalStati = await axios(`https://apiavemaria.onrender.com/api/viewPlayerTotalStati/${idPlayer}`);
      setPlayerTotalStati(totalStati.data);
   }

   return(
      <>
         {
            playerTotalStati.map((reg, i) => 
               <tr key={i}>
                  <td>
                     Total
                  </td>
                  <td>
                     {reg.pt}
                  </td>
                  <td>
                     {reg.ast}
                  </td>
                  <td>
                     {reg.rbt}
                  </td>
                  <td>
                     {reg.st}
                  </td>
                  <td>
                     {reg.rb}
                  </td>
                  <td>
                     {reg.ft}
                  </td>
               </tr>   
            )
         }
      </>
   )
}