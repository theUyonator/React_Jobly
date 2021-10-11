import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import JobCardList from "./JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/**This component shows the lists of jobs 
 * 
 * When mounted, it loads jobs from the api and 
 * reloads filtered jobs on sumbit of the search form.
 * 
 * JobList -> JobCardList -> JobCard
 * 
 * This is routed at /jobs 
 */

function JobList() {

    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
        search();
    }, []);

    /**This function is called when the search form is submitted */
    async function search(title) {
        let jobsRes = await JoblyApi.getJobs(title);
        setJobs(jobsRes);
    }

    if(!jobs) return <LoadingSpinner />;

    return (
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm search={search} />
            {jobs.length
                ? <JobCardList jobs={jobs} />
                : <p className="lead">Sorry, no results were found!</p>
            }

        </div>
    );

}

export default JobList;

