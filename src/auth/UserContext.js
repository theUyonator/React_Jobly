import React from "react";

/** This Recat context will allow us to access
 * the current user object through out the jobly
 * app to be able to pass in props and access 
 * state from any other component even though
 * it is not a parent
 */

 const UserContext = React.createContext();

 export default UserContext;