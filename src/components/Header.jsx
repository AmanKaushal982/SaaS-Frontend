import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authThunks.js';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/', { replace: true });
    };
    return (
        <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6'>
            <h1 className='text-lg font-semibold text-gray-800'>Welcome back</h1>
            <div className='flex items-center gap-4'>
                <div className='w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold'>
                    {user?.email?.[0]?.toUpperCase()}
                </div>
                <button onClick={handleLogout} className='text-sm text-gray-600 hover:text-red-500 transition-colors cursor-pointer'>Logout</button>
            </div>
        </header>
    )
}

export default Header;