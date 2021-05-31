import {useContext, useState} from 'react';
import UserContext from '../contexts/UserContext';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import JoblyApi from '../adapters/api';
import './Profile.css';

const Profile = ({updateUser}) => {
    const user = useContext(UserContext);
    const INITIAL_STATE = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
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
            const updatedUser = await JoblyApi.updateUser(user.username, formData);
            updateUser(u => ({...u, ...updatedUser}));
            setErrors(null);
            setFormData(form => ({...form, password: ""}));
        } catch(e) {
            setErrors(e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid>
                <Paper className="Profile" elevation={10}>
                    <h1>Edit Profile</h1>
                    <div>
                        <TextField
                            className="Profile-field"
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
                            className="Profile-field"
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
                            className="Profile-field"
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
                            className="Profile-field"
                            variant="outlined"
                            label="Password"
                            placeholder="Confirm password to make changes."
                            required
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Profile-errors">
                        {errors && errors.map((err, i) => <small key={i}>{err}</small>)}
                    </div>
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit">Save Changes</Button>
                </Paper>
            </Grid>
        </form>
    );
}

export default Profile;