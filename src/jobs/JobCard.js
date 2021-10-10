import React, { useContext, useState, useEffect } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

/**This component when rendered should show
 * limited information about a job.
 * 
 * It is rendered by JobCardList which shows 
 * a card for each job.
 * 
 * JobCardList passes a promp of apply to JobCard
 * which is called when a user clicks the apply
 * button
 */

function JobCard ({ id, title, salary, equity, companyName }) {
    console.log(UserContext);
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateApplicationStatus() {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    /**Apply to a job */
    async function handleApply(evt){
        if(hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div className="JobCard card">{applied}
            <div className="card-body">
                 <h6 className="card-title">{title}</h6>
                 <p>{companyName}</p>
                 {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
                 {equity !== undefined && <div><small>Equity: {equity}</small></div>}
                 <button
                    className="btn btn-danger font-weight-bold text-uppercase float-right"
                    onClick={handleApply}
                    disabled={applied}
                 >
                     {applied ? "Applied" : "Apply"}
                 </button>
            </div>
        </div>
    );

}

/**This helper function renders the integer salary like so
 * '$1,300,493'
 */

function formatSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();

    for(let i = salaryStr.length - 1; i >= 0; i--) {
        digitsRev.push(salaryStr[i])
        if(i > 0 && i % 3 === 0) digitsRev.push(",");
    }

    return digitsRev.reverse().join("");
}

export default JobCard;