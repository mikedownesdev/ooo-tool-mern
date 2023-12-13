import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Root() {
  // const data = useLoaderData();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();

    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#f0f0f0]">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b w-full fixed">
        <Link href="#">
          <PlaneIcon className="w-6 h-6" />
          <span className="sr-only">Company Logo</span>
        </Link>
        <div className="flex items-center">
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </header>
      <aside className="flex flex-col items-center w-48 bg-white text-gray-700 h-screen pt-20">
        <nav className="flex-1 mt-4 p-4">
          <ul>
            <li>
              <Link className="flex items-center mt-4 gap-2" to={`/`}>
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center mt-4 gap-2"
                to={`/requests/new`}
              >
                <PlaneIcon className="w-4 h-4" />
                New Request
              </Link>
            </li>
            <li>
              <Link className="flex items-center mt-4 gap-2" to={`/teams`}>
                <PlaneIcon className="w-4 h-4" />
                Teams
              </Link>
            </li>
            <li>
              <Link className="flex items-center mt-4 gap-2" to={`/settings`}>
                <PlaneIcon className="w-4 h-4" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 h-full overflow-y-auto pt-20">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
