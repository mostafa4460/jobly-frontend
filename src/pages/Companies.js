import {useEffect, useState} from 'react';
import JoblyApi from '../adapters/api';
import { CircularProgress } from '@material-ui/core';
import Company from '../components/Company';
import './Companies.css';

const Companies = () => {
    const [companies, setCompanies] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCompanies = async () => {
            const companyList = await JoblyApi.getCompanies();
            setCompanies(companyList);
            setIsLoading(false);
        }
        getCompanies();
    }, []);

    return (
        <div className="Companies">
            {isLoading
                ? <CircularProgress className="Spinner" size="30rem" thickness={1.5} />
                : companies.map(c => <Company {...c} key={c.handle} />)
            }
        </div>
    );
}

export default Companies;