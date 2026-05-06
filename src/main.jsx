import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Signup from './AuthPages/Signup';
import Login from './AuthPages/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Analytics from './pages/Analytics.jsx';
import Settings from './pages/Settings.jsx';
import Tasks from './pages/Tasks.jsx';
import Admin from './pages/Admin.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Login /> },
            { path: 'signup', element: <Signup /> },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: 'tasks',
                element: (
                    <ProtectedRoute>
                        <Tasks />
                    </ProtectedRoute>
                )
            },
            {
                path: 'analytics',
                element: (
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                )
            },
            {
                path: 'settings',
                element: (
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                )
            },
            {
                path: 'admin',
                element: (
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                )
            },
        ],
    },
]);
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);