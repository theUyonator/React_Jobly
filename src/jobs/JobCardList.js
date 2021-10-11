import React from "react";
import JobCard from "./JobCard"

/**This component when rendered should show
 * a list of jobs. 
 * 
 * It is used when bothe JobList and CompanyDetail lists 
 * Jobs It receives the function prop which will be called
 * by JobCard on apply
 * 
 * JobList -> JobCardList -> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 */

function JobCardList ({ jobs, apply }) {

    return (
        <div className="JobCardList">
            {jobs.map(job => (
                <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))}

        </div>
    );

}


export default JobCardList;