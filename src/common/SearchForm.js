import React, { useState } from "react";
import "./SearchForm.css";

/**This Serach Form component is renderd in company list
 * and job list
 * 
 * It is a form used to filter the companies or jobs 
 * by providing the parameters needed to complete the api
 * resource which will retrieve the appropriate information
 * 
 */

 function SearchForm ({ search }) {

    const [searchTerm, setSearchTerm] = useState("");

    /**When the form is submitted, the parent component
     * should filter
     */
    function handleSubmit(evt){
        // make sure to prevent search term with extra spaces 
        evt.preventDefault();
        search(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    /**Update form fields  */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    name="searchTerm"
                    placeholder="Enter search term..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-lg btn-primary">
                    Submit 
                </button>

            </form>
        </div>
    );
 }

 export default SearchForm;