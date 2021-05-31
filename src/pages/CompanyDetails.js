import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import JoblyApi from '../adapters/api';
import { CircularProgress } from '@material-ui/core';
import Job from '../components/Job';
import './CompanyDetails.css';

const CompanyDetails = () => {
    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {handle} = useParams();

    useEffect(() => {
        const getCompany = async () => {
            const companyRes = await JoblyApi.getCompany(handle);
            setCompany(companyRes);
            setIsLoading(false);
        }
        getCompany();
    }, [handle]);

    return (
        <div className="CompanyDetails">
            {isLoading
                ? <CircularProgress className="Spinner" size="30rem" thickness={1.5} />
                : (
                    <>
                        <h2>{company.name}</h2>
                        <p>{company.description}</p>
                        {company.jobs.map(j => <Job {...j} key={j.id} />)}
                    </>
                )
            }
        </div>
    );
}

export default CompanyDetails;