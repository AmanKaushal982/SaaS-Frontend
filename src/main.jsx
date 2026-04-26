import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './AuthPages/Signup';
import Login from './AuthPages/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: 'signup',
                    element: <Signup />,
                },
            ],
        },
    ]
);


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
