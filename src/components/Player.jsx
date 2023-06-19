import { PlayerStati } from './PlayerStati'
import { PlayerTotalStati } from './PlayerTotalStati'
import { PlayerPercentageStati } from './PlayerPercentageStati'

import { PlayerStatiPlayOff } from './PlayerStatiPlayOff'
import { PlayerTotalStatiPlayOff } from './PlayerTotalStatiPlayOff'
import { PlayerPercentageStatiPlayOff } from './PlayerPercentageStatiPlayOff'

import '../css/player.css'

export const Player = ({ player }) => {

   return (
      <section className={'player'}>
         {
            player.map((reg, i) =>
               <article key={i}>
                  <aside>
                     <p>{reg.fullName}</p>
                     <p>{reg.jacket}</p>
                     <img src={`https://apiavemaria.onrender.com/${reg.photo}`} alt="imagen rota" />
                  </aside>

                  <table>
                     <tr><td colSpan="7">REGULAR</td></tr>
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

                     <tr><td colSpan="7">PLAYOFF</td></tr>
                     {
                        <PlayerStatiPlayOff
                           idPlayer={reg.idPlayer}
                        />
                     }
                     {
                        <PlayerTotalStatiPlayOff
                           idPlayer={reg.idPlayer}
                        />
                     }
                     {
                        <PlayerPercentageStatiPlayOff
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