import { Navigate, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, grade } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    // Check if authentication is still being determined
    const checkAuth = async () => {
      // You could refresh/verify the token here if needed
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  if (isLoading) {
    // Show loading spinner while checking authentication
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B18CFE]"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return path
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // If authenticated but missing required data (grade), redirect to a setup page
  if (!grade) {
    return <Navigate to="/select-grade" state={{ from: location.pathname }} replace />;
  }

  // If authenticated and has all required data, render the route
  return children;
};

export default ProtectedRoute;