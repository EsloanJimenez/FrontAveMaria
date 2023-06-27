import '../css/live.css'

export const LiveBroadcast = () => {
   return(
      <div className="live">
         <iframe 
            width="1048" 
            height="590" 
            src="https://www.youtube.com/embed/ZkLSS_qliUc" 
            title="Transmision a sitio web" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
         ></iframe>

         <iframe 
            width="65%" 
            height="600" 
            src="https://www.youtube.com/live_chat?v=ZkLSS_qliUc&embed_domain=torneosalomeurena.netlify.app"
         ></iframe>
      </div>
   )
}