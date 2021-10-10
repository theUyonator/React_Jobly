import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navbar.css";

/**This is the nav bar for the jobly app
 * It shows on every page, when there is a logged in user,
 * links to the main areas of the site are displayed,
 * else it shows just links to a login and sign up forms
 */

 function Navbar ({ logout }) {
     const { currentUser } = useContext(UserContext);

     function loggedInNav () {
         return (
             <ul className="navbar-nav ml-auto">
                 <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/companies">
                        Companies
                    </NavLink>
                 </li>

                 <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/jobs">
                        Jobs
                    </NavLink>
                 </li>

                 <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/profile">
                        Profile
                    </NavLink>
                 </li>

                 <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logout}>
                        Log out {currentUser.username}
                    </Link>
                 </li>

             </ul>
         )
     }

     function loggedOutNav () {
        return (
            <ul className="navbar-nav ml-auto">
          
                <li className="nav-item mr-4">
                   <Link className="nav-link" to="/login">
                       login
                   </Link>
                </li>

                <li className="nav-item mr-4">
                   <Link className="nav-link" to="/signup">
                       sign up
                   </Link>
                </li>

            </ul>
        )
    }

    return (
        <nav className="Navbar navbar navbar-expand-md">
             <Link className="navbar-brand" to="/">
                Jobly
             </Link>
             {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
 }

 export default Navbar;