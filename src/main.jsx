import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import AppLayout from "./components/universal/AppLayout.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Requests from "./pages/Requests.jsx";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CreateRequest from "./pages/CreateRequest";
import action from "@/actions/createRequest";
import createSolution, { markSolutionCorrect } from "@/actions/createSolution";
import { signUp, login } from "@/actions/auth";
import { ProfilePage } from "./pages/profilePage";
import { ResourcesPage } from "./pages/resourcesPage";
import { Notifications } from "./pages/Notifications";
import { RequestDetailPage } from "./pages/requestDetailPage";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <p>Error page</p>,
    children: [
      { index: true, element: <App /> },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "requests/:id",
        element: <RequestDetailPage />,
        action: createSolution,
      },
      {
        path: "/requests/:id/mark-solution",
        action: markSolutionCorrect,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "create-request",
        element: <CreateRequest />,
        action: action,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "resources",
        element: <ResourcesPage />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    action: signUp,
  },
  {
    path: "/login",
    element: <Login />,
    action: login,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
    <RouterProvider router={router} />
    <Toaster />
    </>
  </StrictMode>
);
