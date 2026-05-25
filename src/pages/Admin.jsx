import { useEffect } from 'react';
import { fetchAllUsers, changeUserRole } from '../services/adminThunks';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Admin = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.admin);
    const { user: currentUser } = useSelector((state) => state.auth);
    if (currentUser?.role !== 'admin') {
        return <Navigate to='/dashboard' replace />;
    }
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);
    return (
        <div className='space-y-6'>
            <div>
                <h2 className='text-2xl font-bold text-gray-800'>Admin</h2>
                <p className='text-gray-500 text-sm mt-1'>
                    {users.length} users registered
                </p>
            </div>
            <div className='bg-white rounded-2xl shadow-sm overflow-hidden'>
                <table className='w-full text-sm'>
                    <thead className='bg-gray-50 border-b border-gray-100'>
                        <tr>
                            <th className='text-left px-5 py-3 text-gray-500 font-medium'>Name</th>
                            <th className='text-left px-5 py-3 text-gray-500 font-medium'>Email</th>
                            <th className='text-left px-5 py-3 text-gray-500 font-medium'>Joined</th>
                            <th className='text-left px-5 py-3 text-gray-500 font-medium'>Role</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {users.map((u) => (
                            <tr key={u._id} className='hover:bg-gray-50 transition-colors'>
                                {/* Name */}
                                <td className='px-5 py-4 text-gray-800 font-medium'>
                                    {u.name || '—'}
                                </td>
                                {/* Email */}
                                <td className='px-5 py-4 text-gray-600'>
                                    {u.email}
                                </td>
                                {/* Joined Date */}
                                <td className='px-5 py-4 text-gray-500'>
                                    {new Date(u.createdAt).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </td>
                                {/* Role Dropdown */}
                                <td className='px-5 py-4'>
                                    {/* Apna role nahi badal sakte */}
                                    {u._id === currentUser._id ? (
                                        <span className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full'>
                                            {u.role} (you)
                                        </span>
                                    ) : (
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                            className='border border-gray-300 rounded-lg px-2 py-1 text-sm cursor-pointer'
                                        >
                                            <option value='user'>user</option>
                                            <option value='admin'>admin</option>
                                        </select>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;