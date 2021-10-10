import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profiles/ProfileForm";
import PrivateRoute from "./PrivateRoute"
import CompanyDetails from "../companies/CompanyDetails";


/** These routes are created to be accessible across
 * the jobly site.
 * However routes needing authorization are 
 * wrapped in PrivateRoute
 * 
 * If the user visits a route that doesn't exist,
 * they are redirected to the homepage.
 */

 function Routes({login, signup}) {
   
    return (
        <div className="pt-5">
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>

                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>

                <Route exact path="/signup">
                    <SignupForm signup={signup}/>
                </Route>

                <PrivateRoute exact path="/companies">
                    <CompanyList />
                </PrivateRoute>

                <PrivateRoute exact path="/jobs">
                    <JobList />
                </PrivateRoute>

                <PrivateRoute exact path="/companies/:handle">
                    <CompanyDetails />
                </PrivateRoute>

                <PrivateRoute exact path="/profile">
                    <ProfileForm />
                </PrivateRoute>

                <Redirect to="/" />

            </Switch>

        </div>
    );
 }

 export default Routes;