import '../css/calendar.css';

export const Calendar = ({ calendar, calendarPlayOff }) => {
   return (
      <div id='calendar'>
         <section className='hide'>
            {
               calendar.map((reg, i) =>
                  <article key={i} className="fadeUp">
                     <h3>{reg.nameGame}</h3>
                     <div>
                        <h4>{reg.date}</h4>
                        <h4>{reg.room > 5 ? '' : reg.room < 1 ? '' : reg.time}</h4>
                        <p>
                           <span>{<img width="100px" src={`https://apiavemaria.onrender.com/${reg.photoTeam1}`} alt="imagen rota" />}</span>
                           <span>{reg.pointsTeam1}</span>
                           <span>{reg.room == 5 ? 'OT' : reg.room == 6 ? 'FINAL' : reg.room > 6 ? 'FINAL/OT' : reg.room < 1 ? '7:00 PM' : reg.room}</span>
                           <span>{reg.pointsTeam2}</span>
                           <span>{<img width="100px" src={`https://apiavemaria.onrender.com/${reg.photoTeam2}`} alt="imagen rota" />}</span>
                        </p>
                     </div>
                  </article>
               )
            }

            {
               calendarPlayOff.map((reg, i) =>
                  <article key={i} className="fadeUp">
                     <h3>{reg.nameGame}</h3>
                     <div>
                        <h4>{reg.date}</h4>
                        <h4>{reg.room > 5 ? '' : reg.room < 1 ? '' : reg.time}</h4>
                        <p>
                           <span>{<img width="100px" src={`https://apiavemaria.onrender.com/${reg.photoTeam1}`} alt="imagen rota" />}</span>
                           <span>{reg.pointsTeam1}</span>
                           <span>{reg.room == 5 ? 'OT' : reg.room == 6 ? 'FINAL' : reg.room > 6 ? 'FINAL/OT' : reg.room < 1 ? '7:00 PM' : reg.room}</span>
                           <span>{reg.pointsTeam2}</span>
                           <span>{<img width="100px" src={`https://apiavemaria.onrender.com/${reg.photoTeam2}`} alt="imagen rota" />}</span>
                        </p>
                     </div>
                  </article>
               )
            }
         </section>
      </div>
   )
}