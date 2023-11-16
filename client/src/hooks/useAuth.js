import { createContext, useCallback, useContext, useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(null)
    const [user, setUser] = useLocalStorage("user", null);

    /**
     * Logs in a user with the provided email and password.
     *
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     */
    const login = useCallback(async (email, password) => {
        //Make a request to the login route
        const response = await fetch("auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const { data } = await response.json();

        if (response.ok) {
            console.log('setting user', data.user)
            setUser(data.user);
        } else {
            throw new Error(data.message);
        }
        return response
    }, [setUser])

    /**
     * Logs out the current user
     */
    const logout = useCallback(async () => {
        // Make a request to the logout route
        const response = await fetch("auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            setUser(null);
        } else {
            throw new Error("Something went wrong");
        }
    }, [setUser]);

    const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
