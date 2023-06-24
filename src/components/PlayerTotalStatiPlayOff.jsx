import { useEffect, useState } from "react";
import axios from 'axios';

export const PlayerTotalStatiPlayOff = ({idPlayer}) => {
   const [playerTotalStatiPlayOff, setPlayerTotalStatiPlayOff] = useState([]);

   useEffect(() => {
      getPlayerStatiPlayOff();
   }, [idPlayer])

   const getPlayerStatiPlayOff = async() => {
      const totalStati = await axios(`https://apiavemaria.onrender.com/api/viewPlayerTotalStatiPlayOff/${idPlayer}`);
      setPlayerTotalStatiPlayOff(totalStati.data);
   }

   return(
      <>
         {
            playerTotalStatiPlayOff.map((reg, i) => 
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