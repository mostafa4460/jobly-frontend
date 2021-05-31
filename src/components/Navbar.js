import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, useMediaQuery  } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import UserContext from '../contexts/UserContext';
import './Navbar.css';

const Navbar = ({
  links = [
    {name: "Login", path: "/login"},
    {name: "Signup", path: "/signup"}
  ],
  authLinks = [
    {name: "Companies", path: "/companies"},
    {name: "Jobs", path: "/jobs"},
    {name: "Profile", path: "/profile"}
  ],
  logout
}) => {
  const user = useContext(UserContext);
  const history = useHistory();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLinkClick = pageURL => {
    history.push(pageURL);
    handleMenuClose();
  }

  const mapMenuItems = ({ name, path }) => (
    <MenuItem 
      key={name}
      onClick={() => handleLinkClick(path)}>{name}</MenuItem>
  );
  const menuButton = (
    <>
      <IconButton 
      edge="start" 
      color="inherit" 
      aria-label="menu"
      onClick={handleMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleMenuClose}
      >
        {user === null
          ? links.map(mapMenuItems)
          : [...authLinks.map(mapMenuItems),
              <MenuItem 
                key="Logout"
                onClick={logout}>Logout(<small>{user.username}</small>)</MenuItem>
            ]
        }
      </Menu>
    </>
  );

  const mapLinkItems = ({ name, path }) => (
    <Typography
      key={name} 
      variant="h6" 
      className="Navbar-link"
      onClick={() => handleLinkClick(path)}
    >
      {name}
    </Typography>
  );
  const regularLinks = (
    <>
      {user === null
        ? links.map(mapLinkItems)
        : [...authLinks.map(mapLinkItems),
            <Typography
              key="Logout" 
              variant="h6" 
              className="Navbar-link"
              onClick={logout}
            >
              Logout(<small>{user.username}</small>)
            </Typography>
          ]
      }
    </>
  );

  return (
    <div className="Navbar">
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h4" className="Navbar-title">
            <span 
              className="Navbar-home" 
              onClick={() => handleLinkClick('/')}>Jobly</span>
          </Typography>
          <div>
            {isMobile
              ? menuButton
              : regularLinks
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;