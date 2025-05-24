import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    background: '',
    relationships: '',
  });

  useEffect(() => {
    const savedCharacters = localStorage.getItem('characters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
  }, []);

  const handleOpen = (character = null) => {
    if (character) {
      setEditingCharacter(character);
      setFormData(character);
    } else {
      setEditingCharacter(null);
      setFormData({
        name: '',
        role: '',
        description: '',
        background: '',
        relationships: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCharacter(null);
  };

  const handleSubmit = () => {
    const newCharacters = editingCharacter
      ? characters.map((char) =>
          char.id === editingCharacter.id ? { ...formData, id: char.id } : char
        )
      : [...characters, { ...formData, id: Date.now() }];

    setCharacters(newCharacters);
    localStorage.setItem('characters', JSON.stringify(newCharacters));
    handleClose();
  };

  const handleDelete = (id) => {
    const newCharacters = characters.filter((char) => char.id !== id);
    setCharacters(newCharacters);
    localStorage.setItem('characters', JSON.stringify(newCharacters));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          キャラクター管理
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          新規キャラクター
        </Button>
      </Box>

      <Grid container spacing={3}>
        {characters.map((character) => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{character.name}</Typography>
                  <Box>
                    <IconButton onClick={() => handleOpen(character)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(character.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  役割: {character.role}
                </Typography>
                <Typography variant="body2" paragraph>
                  {character.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  背景: {character.background}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  関係性: {character.relationships}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCharacter ? 'キャラクターを編集' : '新規キャラクター'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="名前"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="役割"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              fullWidth
            />
            <TextField
              label="説明"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="背景"
              value={formData.background}
              onChange={(e) => setFormData({ ...formData, background: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="関係性"
              value={formData.relationships}
              onChange={(e) => setFormData({ ...formData, relationships: e.target.value })}
              multiline
              rows={2}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSubmit} variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Characters; 