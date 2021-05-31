import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Avatar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { logoutTime, showSuccessSnackbar } from '../actions';
import { auth, firestore } from '../firebase';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    firestore.collection('classes').get().then(snapshot => {
      const messages = [];
      const user = auth.currentUser.uid;
      snapshot.forEach( doc => {
        const data = doc.data()
        for(const student in data.students) {
          if(data.students.hasOwnProperty(student)) {
            if(data.students[student] === user) {
              for(const item in data.assignments) {
                if(data.assignments.hasOwnProperty(item)) {
                  messages.push(data.assignments[item].message)
                }
              }
            }
          }
        }
      })
      setNotifications(messages)
    })


  }, [])

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <IconButton color="inherit" onClick={handleClick}>
          <Badge
            badgeContent={notifications.length}
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {
            (notifications.length === 0)
              ? (<MenuItem>No messages</MenuItem>)
              : notifications.map(item => (
                <MenuItem><Avatar sx={{mr: 2}} />{item}</MenuItem>
              ))
          }
        </Menu>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit" onClick={() => firebase.auth().signOut().then(() => {
              dispatch(logoutTime())
              dispatch(showSuccessSnackbar("Logged out successfully"))
            }
          )}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={() => firebase.auth().signOut().then(() => {
              dispatch(logoutTime())
              dispatch(showSuccessSnackbar("Logged out successfully"))
            }
          )}>
            <InputIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
