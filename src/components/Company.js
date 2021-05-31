import {useHistory} from 'react-router-dom';
import {Card, CardActionArea, CardContent, Typography} from '@material-ui/core';
import './Company.css';

const Company = ({ handle, name, description }) => {
    const history = useHistory();

    return (
        <Card className="Company">
            <CardActionArea onClick={() => history.push(`/companies/${handle}`)}>
                <CardContent>
                    <Typography variant="h6">
                        {name}
                    </Typography>
                    <Typography component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Company;