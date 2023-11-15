import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Root from "./routes/root";
import NewRequest from "./routes/NewRequest";
import ErrorPage from "./error-page";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './routes/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "requests/new",
        element: <NewRequest />,
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
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
