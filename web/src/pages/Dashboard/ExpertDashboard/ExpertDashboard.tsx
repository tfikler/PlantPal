import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Box,
} from '@mui/material';
import {
    AssignmentOutlined,
    StarOutline,
    PeopleOutline,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const ExpertDashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { title: 'Active Clients', value: '3', icon: <PeopleOutline />, color: '#4caf50' },
        { title: 'Pending Requests', value: '2', icon: <AssignmentOutlined />, color: '#2196f3' },
        { title: 'Rating', value: '4.8', icon: <StarOutline />, color: '#ff9800' },
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

            {/* Pending Requests */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Pending Requests
                        </Typography>
                        <Typography color="textSecondary">
                            No pending requests at the moment.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => navigate('/requests')}>
                            View All Requests
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            {/* Recent Reviews */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Recent Reviews
                        </Typography>
                        <Typography color="textSecondary">
                            No reviews yet.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => navigate('/reviews')}>
                            View All Reviews
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
};