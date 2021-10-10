import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";

/**This component shows a list of companies in the db
 * 
 * Once mounted, this component loads companies from API.
 * 
 * Also when the search form is submitted, the company list
 * is filtered 
 * 
 * This componet is routed at /companies 
 */

function CompanyList() {

    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnceMounted(){
        search();
    }, []);

    /**Once the form is submitted a filtered 
     * request is made to the jobly api, the list
     * of companies is reloaded 
     *
     */

    async function search(name){
        let companiesRes = await JoblyApi.getCompanies(name);
        setCompanies(companiesRes);
    }

    if(!companies) return <LoadingSpinner />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm search={search} />
            {companies.length ?
                (
                    <div className="CompanyList-List">
                        {companies.map(c => (
                            <CompanyCard
                                Key={c.handle}
                                handle={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logoUrl}
                            />
                        ))}
                    </div>

                ) :
                (
                    <p className="CompanyList-none">Sorry, no results were found!</p>
                )}

        </div>
    );

}

export default CompanyList;
