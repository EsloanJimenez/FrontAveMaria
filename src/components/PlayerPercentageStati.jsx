import { useEffect, useState } from "react";
import axios from 'axios';

export const PlayerPercentageStati = ({idPlayer}) => {
   const [playerPercentageStati, setPlayerPercentageStati] = useState([]);

   useEffect(() => {
      getPlayerStati();
   }, [idPlayer])

   const getPlayerStati = async() => {
      const PercentageStati = await axios(`https://apiavemaria.onrender.com/api/viewPlayerPercentageStati/${idPlayer}`);
      setPlayerPercentageStati(PercentageStati.data);
   }

   return(
      <>
         {
            playerPercentageStati.map((reg, i) => 
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