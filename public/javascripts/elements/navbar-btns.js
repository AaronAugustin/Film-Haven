// * ---------------------------------------------------------------- * \\
// * ELEMENTS / NAVIGATION BAR BUTTONS                                * \\
// * Author: Aaron Augustin                                           * \\
// * ---------------------------------------------------------------- * \\

var FILM_HAVEN_LOGO = document.getElementById('logo');
var PROTOTYPE_BUTTON = document.getElementById('proto-btn');
var PROTOTYPE_BUTTON_RETURN = document.getElementById('proto-btn_return');

/**
 * Adds event listeners to navigation bar buttons.
 * @param {Event} buttonEvents - Button Events
 */
document.addEventListener('DOMContentLoaded', function () {
     console.log('[INFO] Navigation Bar Buttons Initialized.');

     /**
      * Reloads the page when the logo is clicked.
      * @param {Event} FH_EVT - Film Haven Event
      */
     if (FILM_HAVEN_LOGO) { FILM_HAVEN_LOGO.addEventListener('click', function (FH_EVT) { FH_EVT.preventDefault(); location.reload(); }); }
     else { console.error('[ERROR] Film Haven Logo not found.'); }

     /**
      * Navigates to the prototype page when the prototype button is clicked.
      * @param {Event} PROTO_EVT - Prototype Event
      */
     if (PROTOTYPE_BUTTON) {
          PROTOTYPE_BUTTON.addEventListener('click', function (PROTO_EVT) {
               PROTO_EVT.preventDefault();
               location.href = '/prototype';
               console.log('[INFO] proto-btn Clicked. Redirecting to Prototype page...');
          });
     } else { console.error('[ERROR] proto-btn not found.'); }

     /**
      * Navigates to the main page when the prototype return button is clicked.
      * @param {Event} PROTO_RETURN_EVT - Prototype Return Event
      */
     if (PROTOTYPE_BUTTON_RETURN) {
          PROTOTYPE_BUTTON_RETURN.addEventListener('click', function (PROTO_RETURN_EVT) {
               PROTO_RETURN_EVT.preventDefault();
               location.href = '/';
               console.log('[INFO] proto-btn_return Button Clicked. Redirecting to Prototype...');
          });
     } else { console.error('[ERROR] proto-btn_return Button not found.'); }
});
