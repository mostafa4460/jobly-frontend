import {useState, useEffect} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import UserContext from '../contexts/UserContext';
import JoblyApi from '../adapters/api';
import Navbar from './Navbar';
import Home from '../pages/Home';
import Companies from '../pages/Companies';
import CompanyDetails from '../pages/CompanyDetails';
import Jobs from '../pages/Jobs';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#66bb6a',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#eeeeee',
      contrastText: '#ffffff'
    }
  }
});

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const setUpUserLogin = async token => {
    localStorage.setItem('jobly-token', token);
    const user = await JoblyApi.getUserInfo(token);
    setUser(user);
    history.push('/companies');
  }

  const logoutUser = () => {
    localStorage.removeItem('jobly-token');
    setUser(null);
    history.push('/');
  }
  const loginUser = async loginData => {
    try {
      const token = await JoblyApi.loginUser(loginData);
      await setUpUserLogin(token);
    } catch (e) {
      throw e;
    }
  }
  const signupUser = async signupData => {
    try {
      const token = await JoblyApi.signupUser(signupData);
      await setUpUserLogin(token);
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    const loginUserFromLS = async () => {
      const token = localStorage.getItem('jobly-token');
      if (token) {
        const user = await JoblyApi.getUserInfo(token);
        setUser(() => user);  
      }
    }
    loginUserFromLS();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={user}>
          <Navbar logout={logoutUser} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login login={loginUser} />
            </Route>
            <Route exact path="/signup">
              <Signup signup={signupUser} />
            </Route>

            {/* Protected Routes */}
              <Route exact path="/companies">
                {user ? <Companies /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/companies/:handle">
                {user ? <CompanyDetails /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/jobs">
                {user ? <Jobs updateUser={setUser} /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/profile">
                {user ? <Profile updateUser={setUser} /> : <Redirect to="/login" />}
              </Route>
            {/* Protected Routes */}

            <Redirect to="/" />
          </Switch>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
