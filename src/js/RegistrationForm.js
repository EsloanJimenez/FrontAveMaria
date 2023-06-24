export const newClient = () => {
   const fund_new_client = document.querySelector(".container-form");
   fund_new_client.classList.remove('hide_font');
}

export const closeClient = () => {
   const fadeUp = document.querySelector('.card');
   fadeUp.classList.remove('fade-Up');
   fadeUp.classList.add('fadeUp');

   setTimeout(() => {
      const hide_font = document.querySelector(".container-form");
      hide_font.classList.add('hide_font');
   }, 1500);
}

export const closeClientPeriod = () => {
   const fadeUp = document.querySelector('.card');
   fadeUp.classList.remove('fade-Up');
   fadeUp.classList.add('fadeUp');

   setTimeout(() => {
      const hide_font = document.querySelector(".container-form");
      hide_font.classList.add('hide_font');
   }, 1500);
}

export const closeSelectGame = () => {
   const fadeUp = document.querySelector('.card2');
   fadeUp.classList.remove('fade-Up');
   fadeUp.classList.add('fadeUp');

   setTimeout(() => {
      const hide_font = document.querySelector(".selectGame");
      hide_font.classList.add('hide_font');
   }, 1500);

}

export const RegistrationForm = () => {   

   // const add_waiter = document.querySelector(".add_waiter_to_event");
   // const hide_new_wait = document.querySelector('.new_waiter_background');

   // const clouse_client_wait = document.querySelector('.clouse_client_wait');

   

   // clouseClient.addEventListener('click', () => {
   //    hide_font.classList.add('hide_font');
   //    hide_new_wait.classList.add('hide_font')
   // });

   // add_waiter.addEventListener('click', () => {
   //    hide_new_wait.classList.remove('hide_font');
   // })

   // clouse_client_wait.addEventListener('click', () => {
   //    hide_new_wait.classList.add('hide_font')
   // })

   // const clouse_client_event = () => {
   //    const hide_font_event = document.querySelector(".new_waiter_background");

   //    hide_font_event.classList.add('hide_font');
   // }
}