import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const loader = async () => {
    return [
        { msg: "Hello world!" }
    ]
};

export default function Root() {
    // const data = useLoaderData();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();

        logout()
        navigate('/login');

    };
    return (
        <>
            <div id="sidebar">
                <h1>Time Off Request App</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/`}>Home</Link>
                        </li>
                        <li>
                            <Link to={`/requests/new`}>New Request</Link>
                        </li>
                        <li>
                            <a href={`/settings`}>Settings</a>
                        </li>
                    </ul>
                    <form onSubmit={handleLogout}>
                        <button>
                            Logout
                        </button>
                    </form>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
