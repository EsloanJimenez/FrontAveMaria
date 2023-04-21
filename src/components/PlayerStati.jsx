import { useEffect, useState } from "react";
import axios from 'axios';

export const PlayerStati = ({idPlayer}) => {
   const [playerStati, setPlayerStati] = useState([]);

   useEffect(() => {
      getPlayerStati();
   }, [idPlayer])

   const getPlayerStati = async() => {
      const stati = await axios(`https://apiavemaria.onrender.com/api/viewPlayerStati/${idPlayer}`);
      setPlayerStati(stati.data);
   }

   return (
      <>
         {
            playerStati.map((reg, i) => 
               <tr key={i}>
                  <td>
                     {i+1}
                  </td>
                  <td>
                     {reg.points}
                  </td>
                  <td>
                     {reg.assists}
                  </td>
                  <td>
                     {reg.rebounds}
                  </td>
                  <td>
                     {reg.stoppers}
                  </td>
                  <td>
                     {reg.robberies}
                  </td>
                  <td>
                     {reg.faults}
                  </td>
               </tr>   
            )
         }
      </>
   )
}