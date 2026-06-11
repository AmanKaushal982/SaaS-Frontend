import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Signup from './AuthPages/Signup.jsx';
import Login from './AuthPages/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Analytics from './pages/Analytics.jsx';
import Settings from './pages/Settings.jsx';
import Tasks from './pages/Tasks.jsx';
import Admin from './pages/Admin.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import TaskDetail from './pages/TaskDetail.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PublicRoute from './components/PublicRoute.jsx';

const router = createBrowserRouter([
    {
        path: '/', element: <App />,
        children: [
            { index: true, element: <PublicRoute><Login /></PublicRoute> },
            { path: 'signup', element: <PublicRoute><Signup /></PublicRoute> },
            {
                element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
                children: [
                    { path: 'dashboard', element: <Dashboard /> },
                    { path: 'tasks', element: <Tasks /> },
                    { path: 'analytics', element: <Analytics /> },
                    { path: 'settings', element: <Settings /> },
                    { path: 'admin', element: <Admin /> },
                    { path: 'tasks', element: <Tasks /> },
                    { path: 'taskdetail', element: <TaskDetail /> }
                ]
            },
        ],
    },
]);
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="471073544394-nm22t5bnngj8aajng5vcj5prpu6ngd2d.apps.googleusercontent.com">
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    </Provider>
);