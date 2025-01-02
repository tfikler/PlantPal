import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Card, Typography, Button } from '@mui/material';
import {
    People as PeopleIcon,
    Assignment as RequestsIcon,
    Star as StarIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import './ExpertDashboard.css';

export const ExpertDashboard = () => {
    const navigate = useNavigate();

    const stats = [
        {
            title: 'Active Clients',
            value: '8',
            icon: <PeopleIcon />,
            color: '#059669',
            bgColor: '#ecfdf5',
            path: '/clients'
        },
        {
            title: 'Pending Requests',
            value: '3',
            icon: <RequestsIcon />,
            color: '#2563eb',
            bgColor: '#eff6ff',
            path: '/requests'
        },
        {
            title: 'Rating',
            value: '4.9',
            icon: <StarIcon />,
            color: '#d97706',
            bgColor: '#fef3c7',
            path: '/reviews'
        }
    ];

    return (
        <div className="expert-dashboard">
            <Box className="dashboard-header">
                <Box>
                    <Typography variant="h5" className="page-title">
                        Expert Dashboard
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Overview of your plant care services
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    className="availability-button"
                    onClick={() => navigate('/availability')}
                >
                    Update Availability
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
                                <Typography variant="h6">Pending Care Requests</Typography>
                                <Button
                                    color="primary"
                                    endIcon={<NavigateNextIcon />}
                                    onClick={() => navigate('/requests')}
                                >
                                    View All
                                </Button>
                            </Box>
                            <Box className="card-content">
                                <Typography variant="body2" color="textSecondary">
                                    No pending requests at the moment
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card className="activity-card">
                            <Box className="card-header">
                                <Typography variant="h6">Recent Reviews</Typography>
                                <Button
                                    color="primary"
                                    endIcon={<NavigateNextIcon />}
                                    onClick={() => navigate('/reviews')}
                                >
                                    View All
                                </Button>
                            </Box>
                            <Box className="card-content">
                                <Typography variant="body2" color="textSecondary">
                                    No reviews yet
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};
