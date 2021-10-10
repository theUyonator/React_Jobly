import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
    username: "testuser",
    first_name: "first",
    last_name: "last",
    email: "testuser@test.com",
    photo_url: null,
};

const UserProvider = 
    ({ children, currentuser=demoUser, hasAppliedToJob = () => false }) => (
        <UserContext.Provider value={{ currentuser, hasAppliedToJob}}>
            {children}
        </UserContext.Provider>
    );

export { UserProvider };