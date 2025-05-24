import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Timeline as TimelineIcon,
  Settings as SettingsIcon,
  Public as PublicIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const navItems = [
    { text: 'ホーム', icon: <HomeIcon />, path: '/' },
    { text: 'キャラクター', icon: <PeopleIcon />, path: '/characters' },
    { text: 'プロット', icon: <TimelineIcon />, path: '/plot' },
    { text: '設定', icon: <SettingsIcon />, path: '/settings' },
    { text: '世界観', icon: <PublicIcon />, path: '/world' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          ファンタジー小説のストーリー構築
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.text}
              component={RouterLink}
              to={item.path}
              color="inherit"
              startIcon={item.icon}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 