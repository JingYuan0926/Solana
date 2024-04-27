import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Button, Tooltip, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {
  ThirdwebProvider,
  ConnectButton,
} from "thirdweb/react";
import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";
import { client } from '../utils/constants';

// Styled components for search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


// Define the pages and menu options
const pages = ['Home', 'Events', 'Marketplace', 'Contact Us'];
const settings = ['Profile', 'Settings', 'Portfolio', 'Logout'];

function Navbar() {
  // State variables
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [color, setColor] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Event handlers
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);


  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const COLOR_CHANGE_THRESHOLD = 50;
      setColor(window.scrollY >= COLOR_CHANGE_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Define the routes for each option
  const routes = {
    Portfolio: '/portfolio',
    Profile: '/profile',
    Settings: '/settings',
  };

  // Function to handle navigation to the specified route
  const handleNavigate = (routes) => {
    handleCloseUserMenu(); // Close the menu before navigating
    navigate(routes);       // Navigate to the specified route
  };

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
  ];

  return (
    <AppBar position="fixed" sx={{ backgroundColor: color ? 'rgba(0, 71, 171, 1)' : 'rgba(29, 41, 81, 1)', transition: 'background-color 0.1s ease-in' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and Text */}
          <Typography variant="h6" noWrap sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '.1rem', color: 'white', textDecoration: 'none', fontSize: '1.7rem' }}>TicketWave</Typography>

          {/* Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} style={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" variant="body1">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Pages */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: '40px' }}>
            {pages.map((page, index) => (
              <Button key={page} sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Georgia, serif', fontSize: '1.6rem', marginRight: index < pages.length - 1 ? '2rem' : 0 }} onClick={() => navigate(`/${page.toLowerCase()}`)}>{page}</Button>
            ))}
          </Box>

          <Box sx={{ mr: 7 }}> {/* Adjust the value as needed */}
            <ConnectButton
              client={client}
              wallets={wallets}
              theme="dark"
              connectModal={{ size: "wide" }}
            />
          </Box>

          {/* Search element */}
          {/* <Search style={{ marginRight: '40px', width: `${Math.min(searchValue.length * 10 + 180, 350)}px`, height: '33px' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{ width: '100%', height: '100%', fontSize: '1.4rem' }} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </Search> */}
          <div>
            {/* User element */}
            <div>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ mr: 2 }}>
                  <Avatar alt="User" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* Menu items */}
                {Object.entries(routes).map(([option, route]) => (
                  <MenuItem key={option} onClick={() => handleNavigate(route)}>
                    <Typography textAlign="center" variant="body1">{option}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;