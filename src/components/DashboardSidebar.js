import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography } from '@material-ui/core';
import {
  BookOpen as ClassesIcon,
  Clipboard as BoardIcon,
  Settings as SettingsIcon,
  User as UserIcon
} from 'react-feather';
import NavItem from './NavItem';
import { auth, firestore } from '../firebase';


const items = [
  {
    href: '/app/dashboard',
    icon: BoardIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/products',
    icon: ClassesIcon,
    title: 'Classes'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  let [person, setPerson] = useState('');

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }

    console.log("DashboardSideBar")

    firestore.collection('students')
      .get()
      .then( snapshot => {
        let fullname = '';
        const user = auth.currentUser.uid
        snapshot.forEach(doc => {
          const data = doc.data()
          const uid = doc.id;
          if (user === uid) {
            const firstname = data.firstname + " "
            const lastname = data.lastname
            fullname = firstname.concat(lastname)
          }
        })
        setPerson(fullname)
      }).catch( error => console.log(error))

  }, [location.pathname]);

  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'student',
    name: person
};

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
