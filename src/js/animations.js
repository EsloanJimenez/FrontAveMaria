// SELECCIONANDO LOS ELEMENTOS CON LAS CLASES ANIIMADO
const fadeTop = document.querySelectorAll('.fadeTop');
const fadeRight = document.querySelectorAll('.fadeRight');
const fadeBottom = document.querySelectorAll('.fadeBottom');
const fadeLeft = document.querySelectorAll('.fadeLeft');

window.addEventListener('scroll', () => {
   let sizeVentana = window.innerHeight ;

   for (let t = 0; t < fadeTop.length; t++) {
      let distanciaTop = fadeTop[t].getBoundingClientRect().top;

      if(distanciaTop <= sizeVentana) fadeTop[t].classList.add('fade-Top');
      else fadeTop[t].classList.remove('fade-Top');
   }

   for (let r = 0; r < fadeRight.length; r++) {
      let distanciaRight = fadeRight[r].getBoundingClientRect().top;

      if (distanciaRight <= sizeVentana) fadeRight[r].classList.add('fade-Right');
      else fadeRight[r].classList.remove('fade-Right');
   }

   for(let b = 0; b < fadeBottom.length; b++) {
      let distanciaBottom = fadeBottom[b].getBoundingClientRect().top;

      if (distanciaBottom <= sizeVentana) fadeBottom[b].classList.add('fade-Bottom');
      else fadeBottom[b].classList.remove('fade-Bottom');
   }
   
   for(let l = 0; l < fadeLeft.length; l++) {
      let distanciaLeft = fadeLeft[l].getBoundingClientRect().top;

      if (distanciaLeft <= sizeVentana) fadeLeft[l].classList.add('fade-Left');
      else fadeLeft[l].classList.remove('fade-Left');
   }
})
