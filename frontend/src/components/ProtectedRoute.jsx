import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();
  
  // Agar user login nahi hai, toh login page pe bhej do
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar login hai, toh andar aane do
  return <Outlet />;
};

export default ProtectedRoute;