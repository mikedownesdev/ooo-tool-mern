import { createContext, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        // Make a request to the login route
        const response = await fetch("auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // If the login was successful, store the user in state
            setUser(data.user);
            navigate("/")
        } else {
            // If the login was unsuccessful, throw an error
            throw new Error(data.message);
        }
    }

    const logout = async () => {
        // Make a request to the logout route
        const response = await fetch("auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            // If the logout was successful, remove the user from state
            setUser(null);
            navigate("/login");
        } else {
            // If the logout was unsuccessful, throw an error
            throw new Error("Something went wrong");
        }
    }

    const value = useMemo(() => ({ user, login, logout }), [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};
