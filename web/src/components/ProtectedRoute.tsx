import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = useSelector((state: RootState) => state.auth);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
