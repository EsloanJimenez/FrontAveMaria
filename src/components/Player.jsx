import { PlayerStati } from './PlayerStati'

import '../css/player.css'
import { PlayerTotalStati } from './PlayerTotalStati'
import { PlayerPercentageStati } from './PlayerPercentageStati'

export const Player = ({ player }) => {

   return (
      <section className='player'>
         {
            player.map((reg, i) =>
               <article key={i}>
                  <aside>
                     <p>{reg.fullName}</p>
                     <p>{reg.jacket}</p>
                     <img src={`https://apiavemaria.onrender.com/${reg.photo}`} alt="imagen rota" />
                  </aside>
                  <table>
                     <tr>
                        <td>Juego</td><td>Pt</td><td>As</td><td>Rb</td><td>Tp</td><td>Rbs</td><td>Fat</td>
                     </tr>
                     {
                        <PlayerStati
                           idPlayer={reg.idPlayer}
                        />
                     }
                     {
                        <PlayerTotalStati
                           idPlayer={reg.idPlayer}
                        />
                     }
                     {
                        <PlayerPercentageStati
                           idPlayer={reg.idPlayer}
                        />
                     }
                  </table>
               </article>
            )
         }
      </section>
   )
}