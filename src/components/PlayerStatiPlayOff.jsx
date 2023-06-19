import { useEffect, useState } from "react";
import axios from 'axios';

export const PlayerStatiPlayOff = ({idPlayer}) => {
   const [playerStatiPlayOff, setPlayerStatiPlayOff] = useState([]);

   useEffect(() => {
      getPlayerStatiPlayOff();
   }, [idPlayer])

   const getPlayerStatiPlayOff = async() => {
      const stati = await axios(`http://localhost:9000/api/viewPlayerStatiPlayOff/${idPlayer}`);
      setPlayerStatiPlayOff(stati.data);
   }

   return (
      <>
         {
            playerStatiPlayOff.map((reg, i) => 
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