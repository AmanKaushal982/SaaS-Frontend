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
import DashboardLayout from './layouts/DashboardLayout.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Login /> },
            { path: 'signup', element: <Signup /> },
            {
                element: (
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    { path: 'dashboard', element: <Dashboard /> },
                    { path: 'tasks', element: <Tasks /> },
                    { path: 'analytics', element: <Analytics /> },
                    { path: 'settings', element: <Settings /> },
                    { path: 'admin', element: <Admin /> },
                ]
            }, d
        ],
    },
]);
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);