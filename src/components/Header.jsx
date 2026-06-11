import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authThunks.js';
import useCurrentDate from '../hooks/useCurrentDate.js';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const displayName = user?.name || user?.email || 'there';
    const today = useCurrentDate();
    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/', { replace: true });
    };
    return (
        <header className='mt-4 px-6 flex flex-col mb-7 gap-1'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-semibold tracking-tight'>Hey there, {displayName}!</h1>

                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold'>
                        {user?.email?.[0]?.toUpperCase()}
                    </div>
                    <button onClick={handleLogout} className='text-sm text-gray-600 hover:text-red-500 transition-colors cursor-pointer'>Logout</button>
                </div>
            </div>
            <p className='text-sm text-muted'>What's happening in your workspace{today}</p>
        </header>
    )
}

export default Header;