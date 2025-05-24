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
  Tabs,
  Tab,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const World = () => {
  const [worldElements, setWorldElements] = useState({
    geography: [],
    history: [],
    races: [],
    organizations: [],
    artifacts: [],
  });
  const [open, setOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const [currentTab, setCurrentTab] = useState('geography');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    details: '',
    significance: '',
    notes: '',
  });

  useEffect(() => {
    const savedElements = localStorage.getItem('worldElements');
    if (savedElements) {
      setWorldElements(JSON.parse(savedElements));
    }
  }, []);

  const handleOpen = (element = null) => {
    if (element) {
      setEditingElement(element);
      setFormData(element);
    } else {
      setEditingElement(null);
      setFormData({
        name: '',
        description: '',
        details: '',
        significance: '',
        notes: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingElement(null);
  };

  const handleSubmit = () => {
    const newElements = { ...worldElements };
    const currentElements = [...worldElements[currentTab]];

    if (editingElement) {
      const index = currentElements.findIndex((e) => e.id === editingElement.id);
      currentElements[index] = { ...formData, id: editingElement.id };
    } else {
      currentElements.push({ ...formData, id: Date.now() });
    }

    newElements[currentTab] = currentElements;
    setWorldElements(newElements);
    localStorage.setItem('worldElements', JSON.stringify(newElements));
    handleClose();
  };

  const handleDelete = (id) => {
    const newElements = { ...worldElements };
    newElements[currentTab] = worldElements[currentTab].filter((e) => e.id !== id);
    setWorldElements(newElements);
    localStorage.setItem('worldElements', JSON.stringify(newElements));
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const tabLabels = {
    geography: '地理・地形',
    history: '歴史・伝説',
    races: '種族・民族',
    organizations: '組織・勢力',
    artifacts: '遺物・宝物',
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          世界観構築
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          新規要素
        </Button>
      </Box>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {Object.entries(tabLabels).map(([key, label]) => (
          <Tab key={key} value={key} label={label} />
        ))}
      </Tabs>

      <Grid container spacing={3}>
        {worldElements[currentTab].map((element) => (
          <Grid item xs={12} sm={6} md={4} key={element.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{element.name}</Typography>
                  <Box>
                    <IconButton onClick={() => handleOpen(element)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(element.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph>
                  {element.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  詳細: {element.details}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  重要性: {element.significance}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  メモ: {element.notes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingElement ? '要素を編集' : '新規要素'}
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
              label="説明"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="詳細"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="重要性"
              value={formData.significance}
              onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
              multiline
              rows={2}
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

export default World; 