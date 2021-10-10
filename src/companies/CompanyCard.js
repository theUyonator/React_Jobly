import React from "react";
import { Link } from "react-router-dom";

import "./CompanyCard.css";

/**This company shows information about a
 * company and is rendered by the 
 * companylist component.
 */

 function CompanyCard ({name, description, logoUrl, handle}){
    return (
        <Link className="CompanyCard card" to={`/companies/${handle}`}>
            <div className="card-body">
                <h6 className="card-title">
                    {name}
                    {logoUrl && <img src={logoUrl}
                                     alt={name}
                                     className="float-right ml-5"
                                />
                    }

                </h6>
                <p><small>{description}</small></p>
            </div>
        </Link>
    );
 }

 export default CompanyCard;