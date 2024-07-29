import React, { useState } from 'react';
import { Image, Box, Title, Text, Button, Drawer, Stack } from '@mantine/core';
import { useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import classes from '../styles/Header.module.css';
import { Link } from 'react-router-dom';

import cart from "../assets/images/cartIcon.png";
import profileImage from '../assets/images/profile.png';
import loggedImage from '../assets/images/logged.png'; // Import logged image
import LoginForm from './LoginForm';

const Header = () => {
  const { isAuthenticated, handleLogout } = useContext(SessionContext);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpened(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpened(false);
  };

  return (
    <Box className={classes.header}>

      <Text className={classes.logo}>Logo</Text>
      <Title order={2} className={classes.title}>Our Store Name</Title>
      
      <Link to="/cart">

        <Image
          src={cart}
          alt="Shopping cart"
          width={24}
          height={24}
        />
      </Link>


      {!isAuthenticated && (
        <>
          <Button onClick={handleOpenLogin} style={{ padding: 0, border: 'none', background: 'none' }}>
            <Image src={profileImage} alt="Profile" width={24} height={24} />
          </Button>
        </>
      )}
      {isLoginOpen && <LoginForm isOpen={isLoginOpen} onClose={handleCloseLogin} />}


      {isAuthenticated && (
        <>
          <Button onClick={handleDrawerOpen} style={{ padding: 0, border: 'none', background: 'none' }}>
            <Image src={loggedImage} alt="Menu" width={24} height={24} />
          </Button>
          <Drawer
            opened={drawerOpened}
            onClose={handleDrawerClose}
            title="User Menu"
            padding="md"
            size="md"
            position="right"
          >
            <Stack>
              <Link to="/profile/userId" className={classes.navLink} onClick={handleDrawerClose}>Profile Page</Link>
              <Button type="button" onClick={handleLogout}>Logout</Button>
            </Stack>
          </Drawer>
        </>
      )}
    </Box>
  );
};

export default Header;
