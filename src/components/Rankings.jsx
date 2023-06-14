import '../css/rankings.css'
import { PlayOff } from './PlayOff'

export const Rankings = ({leagueTeam}) => {
   return(
      <div className="rankings hide">
         <table >
            <thead>
               <tr>
                  <th colSpan={3}>Equipos</th>
                  <th>Ganados</th>
                  <th>Perdidos</th>
               </tr>
            </thead>
            <tbody>
               {
                  leagueTeam.map((reg, i) =>
                     <tr key={i} className='fadeRight'>
                        <td>{i+1}</td>
                        <td><img src={`https://apiavemaria.onrender.com/${reg.iconTeam}`} /></td>
                        <td>{reg.nameTeam}</td>
                        <td>{reg.gameWon}</td>
                        <td>{reg.gameLost}</td>
                     </tr>   
                  )
               }
            </tbody>
         </table>

         <PlayOff />
      </div>
   )
}