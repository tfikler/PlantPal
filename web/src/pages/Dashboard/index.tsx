import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { RootState } from '../../store';
import { DashboardLayout } from './DashboardLayout/DashboardLayout';
import { OwnerDashboard } from './OwnerDashboard/OwerDashboard';
import { ExpertDashboard } from './ExpertDashboard/ExpertDashboard';

const Index = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <DashboardLayout>
            <Grid container spacing={3}>
                {user?.user_type === 'owner' ? <OwnerDashboard /> : <ExpertDashboard />}
            </Grid>
        </DashboardLayout>
    );
};

export default Index;