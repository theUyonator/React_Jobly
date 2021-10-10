import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar from "./routes/Navbar";
import Routes from "./routes/Routes";
import LoadingSpinner from  "./common/LoadingSpinner";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

// The name of the key that the token will be saved in local
// storage as
export const LOCAL_STORAGE_TOKEN = "jobly-token";

/**Jobly App
 * 
 * - infoLoaded: this checks to see if user data has been
 * pulled from Jobly API, this manages the Loading Spinner also.
 * 
 * - currentUser: This holds the user object from the Jobly API.
 * Using UserContext, this can be accessed in any component across
 * the Jobly App and is used to tell if there is a logged in user.
 * 
 * - token: This is the authenticantion jwt token for logged in users 
 * It is required to make most API calls to the Jobly Backend.
 * This read and synced to LocalStorage using the custom useLocalStorage hook.
 * 
 * App -> Routes 
 */


function App () {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [applicationIds, setApplicationIds] = useState(new Set([]));
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN);

    /**This effect loads user info from the Jobly API.
     * If a user is not logged in and there is no token,
     * this effect does not run. It will only re-run when a user 
     * logs out and so this effect is dependent on the 
     * token.
     */

     useEffect(function loadUserinfo() {
         async function getCurrentUser(){
             if(token){
                try{
                 let { username } = jwt.decode(token);
                 JoblyApi.token = token;
                 let curr = await JoblyApi.getCurrentUser(username);
                 setCurrentUser(curr);
                 setApplicationIds(new Set(curr.applications));
                } catch (err) {
                    console.error("App loadUserInfo: problem loading", err);
                    setCurrentUser(null);
                }
             }
             setInfoLoaded(true);
         }

        //  While the async getCurrentUser function runs
        // set infoloaded to false.
        // Once the data is fetched or an error occurs
        // infoLoaded will set back to false to control 
        // the spinner

        setInfoLoaded(false);
        getCurrentUser();
     }, [token]);

     /**This function handles sitewide logout */
     function logout() {
         setCurrentUser(null);
         setToken(null);
     }

     /**This function handles site wide signup and
      *  automatically logs the user in
     */

     async function signup(data) {
         try{
             let token = await JoblyApi.signup(data);
             setToken(token);
             return { success: true };
         }catch(err){
             console.error("signup failed", err);
             return { success: false, err };
         }
     }

     /**This function handles site wide login */
     async function login(data){
         try{
            let token = await JoblyApi.login(data);
            setToken(token);
            return { success: true };
         }catch(err){
            console.error("login failed", err);
             return { success: false, err };
         }
     }

    /**This function checks if a job has been applied to */
    function hasAppliedToJob(id) {
        return applicationIds.has(id);
    }

    /** This function makes the api call to apply for a job */
    function applyToJob(id) {
        if(hasAppliedToJob(id)) return;
        JoblyApi.applyToJob(currentUser.username, id);
        setApplicationIds(new Set([...applicationIds, id]));
    }
    

    if (!infoLoaded) return <LoadingSpinner />;

    return (
        <BrowserRouter>
            <UserContext.Provider
                value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
                    <div className="App">
                        <Navbar logout={logout} />
                        <Routes login={login} signup={signup} />
                    </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;