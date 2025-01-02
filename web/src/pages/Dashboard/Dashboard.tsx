import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { OwnerDashboard } from '../../components/Dashboard/OwnerDashboard/OwnerDashboard';
import { ExpertDashboard } from '../../components/Dashboard/ExpertDashboard/ExpertDashboard';
import { DashboardLayout } from '../../components/Layout/DashboardLayout/DashboardLayout';
import './Dashboard.css';

export const Dashboard = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <DashboardLayout>
            <div className="main-dashboard">
                {user?.user_type === 'owner' ? <OwnerDashboard /> : <ExpertDashboard />}
            </div>
        </DashboardLayout>
    );
};