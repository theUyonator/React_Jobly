import React, { useContext } from "react";
import {Route, Redirect} from "react-router-dom";
import UserContext from "../auth/UserContext";

/**This component chechks if there is a logged in
 * user and only continues with the path if a user 
 * is logged in
 */

function PrivateRoute({ exact, path, children}) {
    const { currentUser } = useContext(UserContext);

    if(!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );

}

export default PrivateRoute;

