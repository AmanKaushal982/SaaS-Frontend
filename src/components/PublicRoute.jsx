import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    console.log('PublicRoute →', { isAuthenticated, loading });
    if (loading) {
        return <div>Loading...</div>;
    }
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

export default PublicRoute;