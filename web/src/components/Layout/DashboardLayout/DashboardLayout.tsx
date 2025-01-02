import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    LocalFlorist as PlantIcon,
    Assignment as RequestsIcon,
    Person as ProfileIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import { RootState } from '../../../store';
import './DashboardLayout.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'My Plants', icon: <PlantIcon />, path: '/plants' },
        { text: 'Requests', icon: <RequestsIcon />, path: '/requests' },
        ...(user?.user_type === 'owner'
            ? [{ text: 'Find Experts', icon: <SearchIcon />, path: '/find-experts' }]
            : []),
        { text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
    ];

    return (
        <Box className="dashboard-container">
            <Box className="sidebar">
                <Box className="sidebar-header">
                    <Typography variant="subtitle1" className="user-name">
                        {user?.full_name}
                    </Typography>
                    <Typography variant="body2" className="user-type">
                        {user?.user_type === 'owner' ? 'Plant Owner' : 'Plant Expert'}
                    </Typography>
                </Box>
                <Divider />
                <List className="menu-list">
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            className="menu-item"
                        >
                            <ListItemIcon className="menu-icon">
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
            <Box className="content">
                {children}
            </Box>
        </Box>
    );
};