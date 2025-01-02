import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Box,
} from '@mui/material';
import {
    LocalFlorist as PlantIcon,
    Add as AddIcon,
    SearchOutlined,
    AssignmentOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const OwnerDashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { title: 'My Plants', value: '5', icon: <PlantIcon />, color: '#4caf50' },
        { title: 'Active Requests', value: '2', icon: <AssignmentOutlined />, color: '#2196f3' },
        { title: 'Completed Tasks', value: '8', icon: <AssignmentOutlined />, color: '#9c27b0' },
    ];

    return (
        <>
            {/* Quick Stats */}
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    {stats.map((stat) => (
                        <Grid item xs={12} sm={4} key={stat.title}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: stat.color,
                                        borderRadius: '50%',
                                        width: 40,
                                        height: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                                <Box>
                                    <Typography variant="h4" component="div">
                                        {stat.value}
                                    </Typography>
                                    <Typography color="textSecondary">{stat.title}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Quick Actions
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => navigate('/plants/add')}
                            >
                                Add New Plant
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                startIcon={<SearchOutlined />}
                                onClick={() => navigate('/find-experts')}
                            >
                                Find Expert
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* Recent Plants */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Recent Plants
                        </Typography>
                        <Typography color="textSecondary">
                            No plants added yet.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => navigate('/plants')}>
                            View All Plants
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            {/* Recent Requests */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Recent Requests
                        </Typography>
                        <Typography color="textSecondary">
                            No active requests.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => navigate('/requests')}>
                            View All Requests
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
};