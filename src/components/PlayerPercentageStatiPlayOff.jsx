import { useEffect, useState } from "react";
import axios from 'axios';

export const PlayerPercentageStatiPlayOff = ({idPlayer}) => {
   const [playerPercentageStatiPlayOff, setPlayerPercentageStatiPlayOff] = useState([]);

   useEffect(() => {
      getPlayerStatiPlayOff();
   }, [idPlayer])

   const getPlayerStatiPlayOff = async() => {
      const PercentageStati = await axios(`https://apiavemaria.onrender.com/api/viewPlayerPercentageStatiPlayOff/${idPlayer}`);
      setPlayerPercentageStatiPlayOff(PercentageStati.data);
   }

   return(
      <>
         {
            playerPercentageStatiPlayOff.map((reg, i) => 
               <tr key={i}>
                  <td>
                     %
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