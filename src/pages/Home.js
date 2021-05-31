import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { Button } from '@material-ui/core';
import UserContext from '../contexts/UserContext';
import './Home.css';

const Home = () => {
    const history = useHistory();
    const user = useContext(UserContext);

    return (
        <div className="Home">
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place.</p>
            {user === null
            ?   <div>
                    <Button 
                        onClick={() => history.push('/login')}
                        style={{marginRight: '15px'}}
                        variant="contained" 
                        color="primary"
                    >
                        Login
                    </Button>
                    <Button 
                        onClick={() => history.push('/signup')}
                        variant="contained" 
                        color="primary"
                    >
                        Signup
                    </Button>
                </div>
            : <h2>Welcome back {user.username} :)</h2>
            }
        </div>
    );
};

export default Home;