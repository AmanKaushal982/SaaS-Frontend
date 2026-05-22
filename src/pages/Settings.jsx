import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Settings = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [profileSuccess, setProfileSuccess] = useState(false);
    const handleProfileInput = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
        if (error) dispatch(clearError());
        setProfileSuccess(false);
    };
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(updateProfile(profileData));
        if (updateProfile.fulfilled.match(result)) {
            setProfileSuccess(true);
        };
    };
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const handlePasswordInput = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordDate.confirmPassword) {
            setPasswordError('New Password do not match');
            return;
        };
        if (passwordData.newPassword.length < 8) {
            setPasswordError('Password must be atleast 8 characters');
            return;
        };
    };
    return (
        <div className='max-w-2xl mx-auto space-y-6'>
            <div>
                <h2 className='text-2xl font-bold text-gray-800'>Settings</h2>
                <p className='text-gray-500 text-sm mt-1'>
                    Manage your profile and password
                </p>
            </div>

            <div className='bg-white rounded-2xl shadow-sm p-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                    Profile
                </h3>
                {profileSuccess && (
                    <div className='bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg mb-4'>
                        Profile updated successfully
                    </div>
                )};
                {error && (
                    <div className='bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-4'>
                        {error}
                    </div>
                )};
                <form onSubmit={handleProfileSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={profileData.name}
                            onChange={handleProfileInput}
                            placeholder='Your name'
                            className='border border-gray-300 rounded-lg px-3 py-2 text-sm'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={profileData.email}
                            onChange={handleProfileInput}
                            placeholder='Your email'
                            className='border border-gray-300 rounded-lg px-3 py-2 text-sm'
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-black text-white py-2 rounded-lg text-sm font-medium cursor-pointer disabled:opacity-60 self-end px-6'
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>

            <div className='bg-white rounded-2xl shadow-sm p-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                    Change Password
                </h3>
                {passwordSuccess && (
                    <div className='bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg mb-4'>
                        Password updated successfully
                    </div>
                )};
                {passwordError && (
                    <div className='bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-4'>
                        {passwordError}
                    </div>
                )};
                <form className='flex flex-col gap-4' onSubmit={handlePasswordSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>
                            Current Password
                        </label>
                        <input type='password' name='currentPassword' onChange={handlePasswordInput} value={passwordData.currentPassword} placeholder='Enter current password' className='border border-gray-300 rounded-lg px-3 py-2 text-sm' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>
                            New Password
                        </label>
                        <input type="password" name='newPassword' value={passwordData.newPassword} onChange={handlePasswordInput} placeholder='Enter new password' className='border border-gray-300 rounded-lg px-3 py-2 text-sm' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>
                            Confirm New Password
                        </label>
                        <input type="password" name='confirmPassword' onChange={handlePasswordInput} value={passwordData.confirmPassword} placeholder='Confirm new password' className='border border-gray-300 rounded-lg px-3 py-2 text-sm' />
                    </div>
                    <button type='submit' disabled={loading} className='bg-black text-white py-2 rounded-lg text-sm font-medium cursor-pointer disabled:opacity-60 self-end px-6'>
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings