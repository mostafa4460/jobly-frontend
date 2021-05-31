import {useState} from 'react';
import {Link} from 'react-router-dom';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import './Signup.css';

const Signup = ({signup}) => {
    const INITIAL_STATE = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState(null);
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(oldForm => ({...oldForm, [name]: value}));
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await signup(formData);
        } catch(e) {
            setErrors(e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid>
                <Paper className="Signup" elevation={10}>
                    <h1>Sign up</h1>
                    <div>
                        <TextField
                            className="Signup-field"
                            variant="outlined"
                            label="First Name"
                            placeholder="Enter your first name"
                            autoFocus={true}
                            required
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            className="Signup-field"
                            variant="outlined"
                            label="Last Name"
                            placeholder="Enter your last name"
                            required
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            className="Signup-field"
                            variant="outlined"
                            label="Email"
                            placeholder="Enter your email"
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            className="Signup-field"
                            variant="outlined"
                            label="Username"
                            placeholder="Enter your username"
                            required
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField 
                            className="Signup-field"
                            variant="outlined"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            required
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Signup-errors">
                        {errors && errors.map((err, i) => <small key={i}>{err}</small>)}
                    </div>
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit">Signup</Button>
                    <p>Already have an account? Login <Link to="/login">here</Link>.</p>
                </Paper>
            </Grid>
        </form>
    );
};

export default Signup;