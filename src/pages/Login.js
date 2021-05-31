import {useState} from 'react';
import {Link} from 'react-router-dom';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import './Login.css';

const Login = ({login}) => {
    const [formData, setFormData] = useState({username: "", password: ""});
    const [errors, setErrors] = useState(null);
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(oldForm => ({...oldForm, [name]: value}));
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(formData);
        } catch(e) {
            setErrors(e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid>
                <Paper className="Login" elevation={10}>
                    <h1>Log in</h1>
                    <div>
                        <TextField
                            className="Login-field"
                            variant="outlined"
                            label="Username"
                            placeholder="Enter username"
                            autoFocus={true}
                            required
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField 
                            className="Login-field"
                            variant="outlined"
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            required
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Login-errors">
                        {errors && errors.map((err, i) => <small key={i}>{err}</small>)}
                    </div>
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit">Login</Button>
                    <p>Don't have an account? Signup <Link to="/signup">here</Link>.</p>
                </Paper>
            </Grid>
        </form>
    );
};

export default Login;