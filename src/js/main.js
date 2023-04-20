const getMain = () => {
   const btnMain = document.querySelector("#btnMain");
   const main = document.querySelector("#main");

   btnMain.addEventListener("click", () => {
      main.classList.toggle("view");
   });

   const subMainBtn = document.querySelector(".subMainBtn");

   subMainBtn.addEventListener("click", () => {
   if (window.innerWidth < 1024) {
      const subMain = document.querySelector(".subMain2");
      const height = subMain.scrollHeight;

      if (subMain.classList.contains("desplegar")) {
         subMain.classList.remove("desplegar");
         subMain.removeAttribute("style");
      } else {
         subMain.classList.add("desplegar");
         subMain.style.height = height + "px";
      }
   }
   });

}