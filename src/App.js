import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Plot from './pages/Plot';
import Settings from './pages/Settings';
import World from './pages/World';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/plot" element={<Plot />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/world" element={<World />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App; 