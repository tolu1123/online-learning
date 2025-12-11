import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import AppLayout from './components/universal/AppLayout.jsx'
import Dashboard from './pages/dashboard.jsx';
import { createBrowserRouter, RouterProvider} from 'react-router'
import Requests from './pages/Requests.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <p>Error page</p>,
    children: [
      { index: true, element: <App /> },
      {
        path: "requests",
        element: < Requests/>,
      },
      {
        path : "dashboard",
        element: <Dashboard/>
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
