import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    console.log("ProtectedRoute");
    const { user } = useAuth();
    console.log('user', user);

    if (!user) {
        console.log('navigating to login');
        // user is not authenticated
        // navigate to login page
        return <Navigate to="/login" />;
    }

    return children;
};
