import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";
import useTimedMessage from "../hooks/useTimedMessage";

/**This component renders logged in user information in a form
 * that can be edited as well.
 * 
 * Submitting the form calls the api to update user info
 * 
 * When the form is submitted a comfirmation of a succesful
 * save is a simple Alert or an opt-in limited time display.
 * 
 * Routed as /profil
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm () {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    console.log(currentUser);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        passWord: "",
    });

    const [formErrors, setFormErrors] = useState([]);

    // To use fancy limited time display message hook
    const [saveConfirmed, setSaveConfirmed] = useState(false);

    /**On form submit:
     * - save user info to backend & report errors
     * - If successful:
     *  - clear previous error messages and password
     *  - show save confirmed message 
     *  - set current user info throughout site
     */

     async function handleSubmit(evt) {
         evt.preventDefault();

         let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            passWord: formData.passWord,
         }

         let username = formData.username;
         let updatedUser;

         try{
             updatedUser = await JoblyApi.saveProfile(username, profileData);
         } catch (err) {
             setFormErrors(err);
             return;
         }

         setFormData(f => ({...f, password: ""}));
         setFormErrors([]);
         setSaveConfirmed(true);

        //  Save new user info across site
        setCurrentUser(updatedUser);
     }

     /**Handle form data changing */
     function handleChange(evt) {
         const { name, value } = evt.target;
         setFormData(f => ({
             ...f,
             [name]: value,
         }));
         setFormErrors([]);
     }

     return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          <h3>Profile</h3>
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Username</label>
                  <p className="form-control-plaintext">{formData.username}</p>
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm password to make changes:</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>
  
                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}
  
                {saveConfirmed
                    ?
                    <Alert type="success" messages={["Updated successfully."]} />
                    : null}
  
                <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
    );

}

export default ProfileForm;

