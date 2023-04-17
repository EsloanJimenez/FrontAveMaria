import '../css/calendar.css';

export const Calendar = ({calendar}) => {
   return(
      <div id='calendar'>
         <section className='hide'>
            {
               calendar.map((reg) => 
                  <article className="fadeUp">
                     <h3>{reg.nameGame}</h3>
                     <div>
                        <h4>{reg.date}</h4>
                        <p>
                           <span>{<img width="100px" src={`http://localhost:9000/${reg.photoTeam1}` } alt="imagen rota" />}</span>
                           <span>{reg.pointsTeam1}</span>
                           <span>Vs</span>
                           <span>{reg.pointsTeam2}</span>
                           <span>{<img width="100px" src={`http://localhost:9000/${reg.photoTeam2}` } alt="imagen rota" />}</span>
                        </p>
                     </div>
                  </article>
               )
            }
         </section>
      </div>
   )
}