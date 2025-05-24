import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  People as PeopleIcon,
  Timeline as TimelineIcon,
  Settings as SettingsIcon,
  Public as PublicIcon,
} from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      title: 'キャラクター管理',
      description: '登場人物の設定や関係性を管理します。',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/characters',
    },
    {
      title: 'プロット管理',
      description: 'ストーリーの展開やイベントを管理します。',
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      path: '/plot',
    },
    {
      title: '設定管理',
      description: '世界観や魔法システムなどの設定を管理します。',
      icon: <SettingsIcon sx={{ fontSize: 40 }} />,
      path: '/settings',
    },
    {
      title: '世界観構築',
      description: '舞台となる世界の地理や歴史を構築します。',
      icon: <PublicIcon sx={{ fontSize: 40 }} />,
      path: '/world',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        ファンタジー小説のストーリー構築
      </Typography>
      <Typography variant="body1" paragraph>
        このアプリケーションは、ファンタジー小説の執筆をサポートするためのツールです。
        キャラクター、プロット、設定、世界観など、小説の重要な要素を整理し、
        効率的にストーリーを構築することができます。
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    color: 'primary.main',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h6" component="h2">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={RouterLink}
                  to={feature.path}
                  size="small"
                  color="primary"
                >
                  詳細を見る
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home; 