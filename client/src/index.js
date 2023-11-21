import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Root, { loader as rootLoader } from "./routes/root";
import NewRequest, { action as newRequestAction } from "./routes/NewRequest";
import ErrorPage from "./error-page";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './routes/Login';
import Home from './routes/Home';
import Register from './routes/Register';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Root /></ProtectedRoute>,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "requests/new",
        element: <NewRequest />,
        action: newRequestAction,
      },
      {
        path: "settings",
        element: <div>Settings</div>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
