import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/**This components renders the company details
 * including job postings for the company
 * 
 * Routed at /companies/:handle
 * 
 * Routes -> CompanyDetail -> JobCardList
 */

function CompanyDetails() {
    const { handle } = useParams()

    const [company, setCompany] = useState(null);

    useEffect(function getCompanyAndJobDetails(){
        async function getCompany() {
            let companyRes = await JoblyApi.getCompany(handle);
            setCompany(companyRes);
        }
        getCompany();
    }, [handle]);

    if(!company) return <LoadingSpinner />;

    return (
        <div className="CompanyDetails col-md-8 offset-md-2">
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    );

}

export default CompanyDetails;
