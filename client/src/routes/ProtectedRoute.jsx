import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
    console.log("ProtectedRoute");
    const { user } = useAuth();
    console.log('user', user);

    if (!user) {
        console.log('navigating to login');
        // user is not authenticated

    }

    return children;
};
