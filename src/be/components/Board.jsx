import '../css/board.css'

export const Board = ({ptTeam1, ptTeam2}) => {
   return(
      <>
         <section className="board">
            <article className='artBoard'>
               <div className="score">
                  <span className="nameTeam blue">{ptTeam1.map(reg => reg.nameTeam)}</span>
               </div>
               
               <div className="score">
                  <div className="marker">
                     <p>SCORE</p>
                     <div id='board'>
                        <strong>
                           {ptTeam1.map(reg => reg.pt)} - {ptTeam2.map(reg => reg.pt)}
                        </strong>
                     </div>
                  </div>
               </div>
               
               <div className="score">
                  <span className="nameTeam red">{ptTeam2.map(reg => reg.nameTeam)}</span>
               </div>
            </article>
         </section>
      </>
   )
}