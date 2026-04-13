import { TmdbClient } from "tmdb-js-wrapper";
import { API_KEY } from "./api/utils";

// * ---------------------------------------------------------------- * \\
// * USER LOGIN HANDLER                                               * \\
// * Author: Aaron Augustin                                           * \\
// * ---------------------------------------------------------------- * \\

/**
 * Handles users information when logging in. (i.e. username, password, API Key, etc.)
 * @param {*} auth - Authentication object
 */
export async function loginHandler(auth) {
     var email = auth.username + '@example.com';
     var username = auth.username;
     var password = auth.password;

     /**
      * Create a new instance of the TmdbClient class.
      * @type {TmdbClient}
      */
     var tmdbClient = new TmdbClient({ API_KEY });

     // Log the user in if able to, and create a session using localStorage.
     // Otherwise, destory the session, or display an error message that prompts the user to try again.
     // [SUBJECT TO CHANGE] - Haven't used the TMDB api in a minute so im using these methods for testing.
     if (await tmdbClient.login(email, username, password)) {
          var accountDetails = await tmdbClient.accountDetails({ email, username, password });
          var sessionId = await tmdbClient.createSession({ email, username, password });
          console.log(`
               [INFO] The user has logged in successfully.
               [INFO] Account Details: ${accountDetails}
               [INFO] Session ID: ${sessionId}
          `);
     } else {
          await tmdbClient.auth.destroySession({ sessionId });
          alert('[ERROR] The user could not log in. Please try again.') || console.log('[INFO] Session has been destroyed.');
     }

     tmdbClient.close();
}