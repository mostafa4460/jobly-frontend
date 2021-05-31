import {useContext} from 'react';
import UserContext from '../contexts/UserContext';
import {Card, CardContent, Typography, Button} from '@material-ui/core';
import './Job.css';

const Job = ({ id, title, salary, equity, apply }) => {
    const user = useContext(UserContext);
    let Btn;
    if (user.applications.includes(id)) {
        Btn = (
            <Button 
                className="Job-apply" 
                variant="contained" 
                color="secondary"
                disabled>Applied</Button>
        );
    } else {
        Btn = (
            <Button 
                className="Job-apply" 
                variant="contained" 
                color="primary"
                onClick={() => apply(id)}>Apply</Button>
        );
    }

    return (
        <Card className="Job">
            <CardContent>
                <Typography className="Job-title" variant="h6">
                    {title}
                </Typography>
                <Typography component="p">
                    Salary: {salary}
                </Typography>
                <Typography component="p">
                    Equity: {equity}
                </Typography>
                {Btn}
            </CardContent>
        </Card>
    );
}

export default Job;