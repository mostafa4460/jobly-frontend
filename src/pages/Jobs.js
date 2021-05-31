import {useEffect, useState, useContext} from 'react';
import UserContext from '../contexts/UserContext';
import JoblyApi from '../adapters/api';
import { CircularProgress } from '@material-ui/core';
import Job from '../components/Job';
import './Jobs.css';

const Jobs = ({updateUser}) => {
    const [jobs, setJobs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const user = useContext(UserContext);
    const apply = async jobId => {
        await JoblyApi.applyUserToJob(user.username, jobId);
        updateUser(u => (
            {
                ...u, 
                applications: [
                    ...u.applications, jobId
                ]
            }
        ));
    }

    useEffect(() => {
        const getJobs = async () => {
            const jobsList = await JoblyApi.getJobs();
            setJobs(jobsList);
            setIsLoading(false);
        }
        getJobs();
    }, []);

    return (
        <div className="Jobs">
            {isLoading
                ? <CircularProgress className="Spinner" size="30rem" thickness={1.5} />
                : jobs.map(j => <Job {...j} key={j.id} apply={apply} />)
            }
        </div>
    );
}

export default Jobs;