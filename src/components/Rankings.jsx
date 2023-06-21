import '../css/rankings.css'
import { PlayOff } from './PlayOff'

export const Rankings = ({leagueTeam, refRanking, refTablePlayOffLeft, refTablePlayOffRight}) => {
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
                     <tr key={i} ref={(e) => refRanking.current[i] = e} className='fadeRight'>
                        <td>{i+1}</td>
                        <td><img src={`http://localhost:9000/${reg.iconTeam}`} /></td>
                        <td>{reg.nameTeam}</td>
                        <td>{reg.gameWon}</td>
                        <td>{reg.gameLost}</td>
                     </tr>   
                  )
               }
            </tbody>
         </table>

         <PlayOff 
            refTablePlayOffLeft = {refTablePlayOffLeft}
            refTablePlayOffRight={refTablePlayOffRight}
         />
      </div>
   )
}