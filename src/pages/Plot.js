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
  Divider,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Plot = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    chapter: '',
    characters: '',
    location: '',
    notes: '',
  });

  useEffect(() => {
    const savedEvents = localStorage.getItem('plotEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleOpen = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData(event);
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        chapter: '',
        characters: '',
        location: '',
        notes: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEvent(null);
  };

  const handleSubmit = () => {
    const newEvents = editingEvent
      ? events.map((event) =>
          event.id === editingEvent.id ? { ...formData, id: event.id } : event
        )
      : [...events, { ...formData, id: Date.now() }];

    setEvents(newEvents);
    localStorage.setItem('plotEvents', JSON.stringify(newEvents));
    handleClose();
  };

  const handleDelete = (id) => {
    const newEvents = events.filter((event) => event.id !== id);
    setEvents(newEvents);
    localStorage.setItem('plotEvents', JSON.stringify(newEvents));
  };

  const handleCardClick = (event) => {
    handleOpen(event);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          プロット管理
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          新規イベント
        </Button>
      </Box>

      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} key={event.id}>
            <Card 
              sx={{ 
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
              onClick={() => handleCardClick(event)}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  bgcolor: 'primary.main',
                }}
              />
              <CardContent sx={{ pl: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{event.title}</Typography>
                  <Box onClick={(e) => e.stopPropagation()}>
                    <IconButton onClick={() => handleOpen(event)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(event.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  チャプター: {event.chapter}
                </Typography>
                <Typography variant="body2" paragraph>
                  {event.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  登場人物: {event.characters}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  場所: {event.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  メモ: {event.notes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingEvent ? 'イベントを編集' : '新規イベント'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="タイトル"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="チャプター"
              value={formData.chapter}
              onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
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
              label="登場人物"
              value={formData.characters}
              onChange={(e) => setFormData({ ...formData, characters: e.target.value })}
              fullWidth
            />
            <TextField
              label="場所"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              fullWidth
            />
            <TextField
              label="メモ"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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

export default Plot; 