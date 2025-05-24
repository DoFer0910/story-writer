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

const Settings = () => {
  const [settings, setSettings] = useState({
    magic: [],
    technology: [],
    culture: [],
    religion: [],
    politics: [],
  });
  const [open, setOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState(null);
  const [currentTab, setCurrentTab] = useState('magic');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rules: '',
    limitations: '',
    notes: '',
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('worldSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleOpen = (setting = null) => {
    if (setting) {
      setEditingSetting(setting);
      setFormData(setting);
    } else {
      setEditingSetting(null);
      setFormData({
        name: '',
        description: '',
        rules: '',
        limitations: '',
        notes: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSetting(null);
  };

  const handleSubmit = () => {
    const newSettings = { ...settings };
    const currentSettings = [...settings[currentTab]];

    if (editingSetting) {
      const index = currentSettings.findIndex((s) => s.id === editingSetting.id);
      currentSettings[index] = { ...formData, id: editingSetting.id };
    } else {
      currentSettings.push({ ...formData, id: Date.now() });
    }

    newSettings[currentTab] = currentSettings;
    setSettings(newSettings);
    localStorage.setItem('worldSettings', JSON.stringify(newSettings));
    handleClose();
  };

  const handleDelete = (id) => {
    const newSettings = { ...settings };
    newSettings[currentTab] = settings[currentTab].filter((s) => s.id !== id);
    setSettings(newSettings);
    localStorage.setItem('worldSettings', JSON.stringify(newSettings));
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const tabLabels = {
    magic: '魔法システム',
    technology: '科学技術',
    culture: '文化・風習',
    religion: '宗教・信仰',
    politics: '政治・社会制度',
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          設定管理
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          新規設定
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
        {settings[currentTab].map((setting) => (
          <Grid item xs={12} sm={6} md={4} key={setting.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{setting.name}</Typography>
                  <Box>
                    <IconButton onClick={() => handleOpen(setting)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(setting.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph>
                  {setting.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ルール: {setting.rules}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  制限: {setting.limitations}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  メモ: {setting.notes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingSetting ? '設定を編集' : '新規設定'}
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
              label="ルール"
              value={formData.rules}
              onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="制限"
              value={formData.limitations}
              onChange={(e) => setFormData({ ...formData, limitations: e.target.value })}
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

export default Settings; 