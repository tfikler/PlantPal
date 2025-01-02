import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Card, Typography, Button } from '@mui/material';
import { Add as AddIcon, LocalFlorist, Assignment, Star } from '@mui/icons-material';
import './OwnerDashboard.css';

export const OwnerDashboard = () => {
    const navigate = useNavigate();

    const stats = [
        {
            title: 'My Plants',
            value: '5',
            icon: <LocalFlorist />,
            color: '#059669',
            bgColor: '#ecfdf5',
            path: '/plants'
        },
        {
            title: 'Active Requests',
            value: '2',
            icon: <Assignment />,
            color: '#2563eb',
            bgColor: '#eff6ff',
            path: '/requests'
        },
        {
            title: 'Average Rating',
            value: '4.8',
            icon: <Star />,
            color: '#d97706',
            bgColor: '#fef3c7',
            path: '/reviews'
        }
    ];

    return (
        <div className="owner-dashboard">
            <Box className="dashboard-header">
                <Box>
                    <Typography variant="h5" className="page-title">
                        Dashboard
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Here's what's happening with your plants
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    className="add-button"
                    onClick={() => navigate('/plants/add')}
                >
                    Add New Plant
                </Button>
            </Box>

            <Grid container spacing={3} className="stats-grid">
                {stats.map((stat) => (
                    <Grid item xs={12} md={4} key={stat.title}>
                        <Card
                            className="stat-card"
                            onClick={() => navigate(stat.path)}
                        >
                            <Box className="stat-content">
                                <Box
                                    className="stat-icon"
                                    style={{
                                        backgroundColor: stat.bgColor,
                                        color: stat.color
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                                <Box className="stat-info">
                                    <Typography variant="h4" className="stat-value">
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {stat.title}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box className="activity-section">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card className="activity-card">
                            <Box className="card-header">
                                <Typography variant="h6">Recent Plants</Typography>
                                <Button color="primary" onClick={() => navigate('/plants')}>
                                    View All
                                </Button>
                            </Box>
                            <Box className="card-content">
                                <Typography variant="body2" color="textSecondary">
                                    You haven't added any plants yet
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card className="activity-card">
                            <Box className="card-header">
                                <Typography variant="h6">Latest Requests</Typography>
                                <Button color="primary" onClick={() => navigate('/requests')}>
                                    View All
                                </Button>
                            </Box>
                            <Box className="card-content">
                                <Typography variant="body2" color="textSecondary">
                                    No active requests at the moment
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};